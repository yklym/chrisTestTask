import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/button";
import { Input } from "../../components/common/input";
import { Loader } from "../../components/common/loader";
import {
  ILoadUserFormDataHocProps,
  WithLoadUserForm,
} from "../../components/loadUserFormHOC";
import { WithUserResultConsumer } from "../../store/userResult";
import { IUserResultContextState } from "../../store/userResult/types";
import { LoadingStatus } from "../../types/components";
import { AppRoutes } from "../../types/routes";
import { IUserFormData, UserFormDataStep } from "../../types/userForm";
import { UserFormFieldName, UserFormStep } from "../../types/userForm/enums";
import {
  getFieldType,
  INITIAL_VALIDATION,
  inputLabels,
  isNextStepAvailable,
  getErrorMessage,
  IUserFormInputsValidations,
} from "./common";

import styles from "./styles.module.scss";

const ZERO_STEP_IDX = 0;

interface IProps extends ILoadUserFormDataHocProps, IUserResultContextState {
  //
}

const formStructure = {
  [UserFormStep.STEP_ONE]: [
    UserFormFieldName.email,
    UserFormFieldName.fullName,
    UserFormFieldName.phone,
  ],
  [UserFormStep.STEP_TWO]: [UserFormFieldName.annualRevenue],
  [UserFormStep.STEP_THREE]: [UserFormFieldName.fundingRequestedAmount],
};

const UserFormPageComponent = ({
  loadingStatus,
  userFormData: initialFormData,
  formIndex: initialFormIdx,
  setOfferFound,
  patchUserFormData,
}: IProps) => {
  const stepsAmount = Object.keys(formStructure).length;

  const [formState, setFormState] = useState<IUserFormData>(initialFormData);
  const [validationState, setValidationState] =
    useState<IUserFormInputsValidations>(INITIAL_VALIDATION);
  const [currStepIdx, setCurrStepIdx] = useState<UserFormStep>(
    Math.min(initialFormIdx, stepsAmount) // check if components amont didn't change
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (currStepIdx !== ZERO_STEP_IDX) {
      patchUserFormData(formState, currStepIdx);
    }
    if (currStepIdx >= stepsAmount) {
      const { annualRevenue } = formState[UserFormStep.STEP_TWO];
      const { fundingRequestedAmount } = formState[UserFormStep.STEP_THREE];

      // If user provided yearly revenue less than $50,000 or funding amount requested less than $25,000 show them “No offers found.”
      const isFoundOffers =
        annualRevenue > 50000 && fundingRequestedAmount > 25000;
      setOfferFound(isFoundOffers);

      navigate(AppRoutes.USER_RESULT);
    }
  }, [currStepIdx]);

  const handleChangeFormState = (key: string, value: string | number) => {
    setValidationState({
      ...validationState,
      [key]: getErrorMessage(key as UserFormFieldName, value),
    });
    setFormState((prevFormState) => {
      return {
        ...prevFormState,
        [currStepIdx]: {
          ...prevFormState[currStepIdx],
          [key]: value,
        },
      };
    });
  };

  const handleIncrementStep = () => setCurrStepIdx((prevStep) => prevStep + 1);
  const handleDecrementStep = () => setCurrStepIdx((prevStep) => prevStep - 1);

  if (
    loadingStatus === LoadingStatus.LOADING ||
    !formState ||
    currStepIdx >= stepsAmount
  ) {
    // loader
    return (
      <div className={styles.pageWrapper}>
        <Loader />
      </div>
    );
  }

  const currFields = formStructure[currStepIdx as keyof typeof formStructure];
  const currStepValues = formState[currStepIdx];

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formWrapper}>
        {/* 
        any at step state as we control currStepIdx to be in UserFormStep and result the interface we need
        don't want to create to much code to do without any or do intersection inside step components 
      */}
        {currFields.map((inputName) => (
          <Input
            key={inputName}
            min={0}
            name={inputName}
            label={inputLabels[inputName as keyof typeof inputLabels]}
            type={getFieldType(inputName)}
            value={currStepValues[inputName as keyof UserFormDataStep]}
            errorMessage={validationState[inputName]}
            onChange={(e) =>
              handleChangeFormState(e.target.name, e.target.value)
            }
          />
        ))}
      </div>

      <Button
        label="Next"
        onClick={handleIncrementStep}
        isDisabled={
          !isNextStepAvailable(currFields, validationState, currStepValues)
        }
      />
      {ZERO_STEP_IDX !== currStepIdx && (
        <Button label="Previous" onClick={handleDecrementStep} />
      )}
    </div>
  );
};

const UserFormPage = WithLoadUserForm(
  WithUserResultConsumer(UserFormPageComponent)
);

export { UserFormPage };
