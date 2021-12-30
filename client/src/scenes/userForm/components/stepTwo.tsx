import React from "react";
import { Input } from "../../../components/common/input";
import { IUserFormDataStepTwo } from "../../../types/userForm";
import { inputLabels, OnUpdateStepStateCb } from "../common";

interface IProps {
  stepState: IUserFormDataStepTwo;
  onUpdateStepState: OnUpdateStepStateCb;
}

const StepTwo = ({ stepState, onUpdateStepState }: IProps) => {
  const handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateStepState(e.target.name, e.target.value);
  };

  return (
    <Input
      name="annualRevenue"
      label={inputLabels.annualRevenue}
      type="number"
      value={stepState.annualRevenue}
      onChange={handleChangeState}
    />
  );
};

export { StepTwo };
