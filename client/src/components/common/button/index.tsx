import React from "react";
import styles from "./styles.module.scss";

interface IProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: IProps) => (
  <button className={styles.button} onClick={onClick}>
    {label}
  </button>
);

export { Button };
