import React from "react";
import styles from "./styles.module.scss";

interface IProps {
  label: string;
  isDisabled?: boolean;
  onClick: () => void;
}

const Button = ({ label, isDisabled, onClick }: IProps) => {
  return (
    <button className={styles.button} onClick={onClick} disabled={isDisabled}>
      {label}
    </button>
  );
};
export { Button };
