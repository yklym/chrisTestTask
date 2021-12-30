import React from "react";
import { Input } from "../../../components/common/input";
import { IUserFormDataStepThree } from "../../../types/userForm";
import { inputLabels, OnUpdateStepStateCb } from "../common";

interface IProps {
  stepState: IUserFormDataStepThree;
  onUpdateStepState: OnUpdateStepStateCb;
}

const StepThree = ({ stepState, onUpdateStepState }: IProps) => {
  const handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateStepState(e.target.name, e.target.value);
  };

  return (
    <Input
      value={stepState.fundingRequestedAmount}
      type="number"
      label={inputLabels.fundingRequestedAmount}
      name="fundingRequestedAmount"
      onChange={handleChangeState}
    />
  );
};

export { StepThree };
