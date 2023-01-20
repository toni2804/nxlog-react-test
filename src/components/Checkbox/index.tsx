import { InputHTMLAttributes } from "react";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Checkbox({ id, label, ...props }: CheckboxProps) {
  return (
    <div className={styles.wrapper}>
      <input type="checkbox" id={id} {...props} className={styles.input} />
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
}
