import React, { useState, useEffect } from "react";
import { Button } from "../../components/common/button";
import { IUserFormData } from "../../types/userForm";
import { UserFormStep } from "../../types/userForm/enums";

import { StepOne, StepTwo, StepThree } from "./components";

import styles from "./styles.module.scss";

const INITIAL_STATE: IUserFormData = {
  [UserFormStep.STEP_ONE]: { email: "", fullName: "", phone: "" },
  [UserFormStep.STEP_TWO]: { annualRevenue: 0 },
  [UserFormStep.STEP_THREE]: { fundingRequestedAmount: 0 },
};

const INITIAL_STEP_IDX = 0;

const UserFormPage = () => {
  const [formState, setFormState] = useState<IUserFormData>(INITIAL_STATE);
  const [currStepIdx, setCurrStepIdx] = useState<number>(INITIAL_STEP_IDX);

  const stepsComponents = [StepOne, StepTwo, StepThree];

  useEffect(() => {
    if (currStepIdx >= stepsComponents.length) {
      // TODO: go to next scene
    }
  }, [currStepIdx, stepsComponents.length]);

  const CurrStepComponent = stepsComponents[currStepIdx];

  const handleChangeFormState = (
    step: UserFormStep,
    key: string,
    value: string | number
  ) => {
    setFormState((prevFormState) => ({
      ...prevFormState,
      [step]: {
        ...prevFormState[step],
        [key]: value,
      },
    }));
  };

  const handleIncrementStep = () => setCurrStepIdx((prevStep) => prevStep + 1);
  const handleDecrementStep = () => setCurrStepIdx((prevStep) => prevStep - 1);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formWrapper}>
        {/* 
        any at step state as we control currStepIdx to be in UserFormStep and result the interface we need
        don't want to create to much code to do without any or do intersection inside step components 
      */}
        <CurrStepComponent
          stepState={formState[currStepIdx as UserFormStep] as any}
          onUpdateStepState={(...args) =>
            handleChangeFormState(currStepIdx as UserFormStep, ...args)
          }
        />
      </div>

      <Button label="Next" onClick={handleIncrementStep} />
      {INITIAL_STEP_IDX !== currStepIdx && (
        <Button label="Previous" onClick={handleDecrementStep} />
      )}
    </div>
  );
};

export { UserFormPage };
