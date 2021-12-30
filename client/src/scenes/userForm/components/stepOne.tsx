import React from "react";
import { Input } from "../../../components/common/input";
import { IUserFormDataStepOne } from "../../../types/userForm";
import { inputLabels, OnUpdateStepStateCb } from "../common";

interface IProps {
  stepState: IUserFormDataStepOne;
  onUpdateStepState: OnUpdateStepStateCb;
}

const StepOne = ({ stepState, onUpdateStepState }: IProps) => {
  const handleChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateStepState(e.target.name, e.target.value);
  };

  // works best for current requirements, should be extended for real form example
  return (
    <>
      {["email", "fullName", "phone"].map((inputName) => (
        <Input
          name={inputName}
          label={inputLabels[inputName as keyof typeof inputLabels]}
          type={inputName === "email" ? "email" : "text"}
          value={stepState[inputName as keyof IUserFormDataStepOne]}
          onChange={handleChangeState}
        />
      ))}
    </>
  );
};

export { StepOne };
