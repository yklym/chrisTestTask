import React from "react";
import { WithUserResultConsumer } from "../../store/userResult";
import { IUserResultContextState } from "../../store/userResult/types";
import styles from "./styles.module.scss";

interface IProps extends IUserResultContextState {}

const UserResultPageComponent = ({ isOffersFound }: IProps) => {
  const message = isOffersFound
    ? "Thank you, we will reach out to you shortly"
    : "No offers found";

  return (
    <div className={styles.pageWrapper}>
      <h1>{message}</h1>;
    </div>
  );
};

const UserResultPage = WithUserResultConsumer(UserResultPageComponent);

export { UserResultPage };
