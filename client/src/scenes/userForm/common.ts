import { UserFormDataStep } from "../../types/userForm";
import { UserFormFieldName } from "../../types/userForm/enums";

export type OnUpdateStepStateCb = (key: string, value: string) => void;

// usually is stored somewhere else
export const inputLabels = {
  [UserFormFieldName.email]: "Email",
  [UserFormFieldName.fullName]: "Full name",
  [UserFormFieldName.phone]: "Phone",
  [UserFormFieldName.annualRevenue]: "Yearly revenue",
  [UserFormFieldName.fundingRequestedAmount]: "Funding Requested Amount",
};

export type IUserFormInputsValidations = Record<UserFormFieldName, string>;

export const INITIAL_VALIDATION: IUserFormInputsValidations = Object.values(
  UserFormFieldName
).reduce(
  (inputValidations, currInputField) => ({
    ...inputValidations,
    [currInputField]: "",
  }),
  {} as IUserFormInputsValidations
);

export const isNextStepAvailable = (
  currInputNames: UserFormFieldName[],
  validationObject: IUserFormInputsValidations,
  formStepState: UserFormDataStep
) => {
  const isAllFieldsValid = currInputNames.every(
    (inputName) => validationObject[inputName] === ""
  );
  const isAllFieldsNotEmpty = Object.values(formStepState).every(
    (fieldValue) => !!fieldValue
  );
  return isAllFieldsNotEmpty && isAllFieldsValid;
};

export const getFieldType = (fieldName: UserFormFieldName) => {
  if (fieldName === UserFormFieldName.email) return "email";
  if (
    [
      UserFormFieldName.annualRevenue,
      UserFormFieldName.fundingRequestedAmount,
    ].includes(fieldName)
  )
    return "number";
  return "text";
};

export const getErrorMessage = (
  name: UserFormFieldName,
  value: string | number
) => {
  const emailRegEx = /\S+@\S+\.\S+/;
  const fieldType = getFieldType(name);

  if (fieldType === "email") {
    if (!emailRegEx.test(value as string)) {
      return "Not valid email";
    }
  } else if (fieldType === "number") {
    if (value <= 0) {
      return "Value should be greater than zero";
    }
  } else if (fieldType === "text") {
    if (typeof value == "string" && !value.length) {
      return "Value should be greater than zero";
    }
  }
  return "";
};
