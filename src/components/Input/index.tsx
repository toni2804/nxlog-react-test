import { InputHTMLAttributes, ReactNode } from "react";
import styles from "src/components/Input/Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  Icon?: ReactNode;
  onIconClick?: () => void;
}

export function Input({
  id,
  label,
  type,
  Icon,
  onIconClick,
  ...props
}: InputProps) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        {...props}
        className={`${styles.input} ${!!Icon ? styles.inputWithIcon : ""}`}
      />
      {Icon && (
        <span className={styles.icon} onClick={onIconClick}>
          {Icon}
        </span>
      )}
    </div>
  );
}
