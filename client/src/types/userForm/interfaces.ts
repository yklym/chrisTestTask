import { UserFormStep } from "./enums";

export interface IUserFormData {
  [UserFormStep.STEP_ONE]: IUserFormDataStepOne;
  [UserFormStep.STEP_TWO]: IUserFormDataStepTwo;
  [UserFormStep.STEP_THREE]: IUserFormDataStepThree;
}

export interface IUserFormDataStepOne {
  fullName: string;
  email: string;
  phone: string;
}

export interface IUserFormDataStepTwo {
  annualRevenue: number;
}

export interface IUserFormDataStepThree {
  fundingRequestedAmount: number;
}
