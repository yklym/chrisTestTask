import React, { HTMLInputTypeAttribute } from "react";
import styles from "./styles.module.scss";

interface IProps<ValueType extends string | number> {
  name?: string;
  type?: HTMLInputTypeAttribute;
  value: ValueType;
  label: string;
  errorMessage?: string;
  min?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = <ValueType extends string | number>({
  name,
  type,
  value,
  label,
  errorMessage,
  min,
  onChange,
}: IProps<ValueType>) => {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        name={name}
        type={type}
        value={value}
        min={min}
        onChange={onChange}
      />
      {!!(errorMessage && errorMessage.length) && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

export { Input };
