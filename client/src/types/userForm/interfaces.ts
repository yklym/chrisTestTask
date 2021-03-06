import { UserFormStep, UserFormFieldName } from "./enums";

export interface IUserFormData {
  [UserFormStep.STEP_ONE]: IUserFormDataStepOne;
  [UserFormStep.STEP_TWO]: IUserFormDataStepTwo;
  [UserFormStep.STEP_THREE]: IUserFormDataStepThree;
}

export interface IUserFormDataStepOne {
  [UserFormFieldName.fullName]: string;
  [UserFormFieldName.email]: string;
  [UserFormFieldName.phone]: string;
}

export interface IUserFormDataStepTwo {
  [UserFormFieldName.annualRevenue]: number;
}

export interface IUserFormDataStepThree {
  [UserFormFieldName.fundingRequestedAmount]: number;
}
