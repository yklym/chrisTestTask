import {
  IUserFormDataStepOne,
  IUserFormDataStepThree,
  IUserFormDataStepTwo,
} from "./interfaces";

export type UserFormDataStep =
  | IUserFormDataStepOne
  | IUserFormDataStepTwo
  | IUserFormDataStepThree;
