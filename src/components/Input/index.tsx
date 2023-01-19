import { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  Icon?: ReactNode;
  onIconClick?: () => void;
}

export function Input({
  id,
  label,
  Icon,
  type,
  onIconClick,
  ...props
}: InputProps) {

  return (
    <div className={styles.container}>
      {label && <label htmlFor={id}>{label}</label>}
      <input type={type} id={id} {...props} />
      {Icon && <span className={styles.icon} onClick={onIconClick}>{Icon}</span>}
    </div>
  );
}
