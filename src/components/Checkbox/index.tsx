import { InputHTMLAttributes } from "react";
import styles from "src/components/Checkbox/Checkbox.module.scss";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ id, label, ...props }: CheckboxProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        <input type="checkbox" id={id} {...props} className={styles.input} />
        <span className={styles.checkmark} />
        {label}
      </label>
    </div>
  );
}
