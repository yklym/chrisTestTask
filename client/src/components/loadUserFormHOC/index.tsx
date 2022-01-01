import React, { useEffect, useState } from "react";
import { IUserFormData } from "../../types/userForm";
import { ApiService } from "../../services/api";
import { UserFormStep } from "../../types/userForm/enums";
import { LoadingStatus } from "../../types/components";
import { Loader } from "../common/loader";

const INITIAL_STATE: IUserFormData = {
  [UserFormStep.STEP_ONE]: { email: "", fullName: "", phone: "" },
  [UserFormStep.STEP_TWO]: { annualRevenue: 0 },
  [UserFormStep.STEP_THREE]: { fundingRequestedAmount: 0 },
};

export interface ILoadUserFormDataHocProps {
  userFormData: IUserFormData;
  loadingStatus: LoadingStatus;
  formIndex: number;
  loadUserFormData: () => void;
  patchUserFormData: (
    newData: Partial<IUserFormData>,
    formIndex: number
  ) => void;
}

type IncomingComponent<InnerProps> = (
  props: InnerProps & ILoadUserFormDataHocProps
) => React.ReactElement<InnerProps & ILoadUserFormDataHocProps>;

const WithLoadUserForm = <InnerProps,>(
  Component: IncomingComponent<InnerProps>
) =>
  function Wrapper(props: any) {
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>(
      LoadingStatus.INITIAL
    );
    const [userFormData, setUserFormData] =
      useState<IUserFormData>(INITIAL_STATE);
    const [formIndex, setFormIndex] = useState<number>(0);

    useEffect(() => {
      loadUserFormData(true);
    }, []);

    const loadUserFormData = async (isInitial = false) => {
      if (!isInitial) {
        setLoadingStatus(LoadingStatus.LOADING);
      }
      const { formIndex, userData } = await ApiService.getUserFormData();
      setFormIndex(formIndex);
      setUserFormData(userData);
      setLoadingStatus(LoadingStatus.SUCCESS);
    };

    const patchUserFormData = async (
      newData: Partial<IUserFormData>,
      formIndex: number
    ) => {
      setLoadingStatus(LoadingStatus.LOADING);
      const userFormData = await ApiService.sendUserFormData(
        newData,
        formIndex
      );
      setUserFormData(userFormData);
      setLoadingStatus(LoadingStatus.SUCCESS);
    };

    if (loadingStatus === LoadingStatus.INITIAL) {
      return <Loader />;
    }

    return (
      <Component
        {...props}
        loadingStatus={loadingStatus}
        formIndex={formIndex}
        patchUserFormData={patchUserFormData}
        loadUserFormData={loadUserFormData}
        userFormData={userFormData}
      />
    );
  };

export { WithLoadUserForm };
