import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The flag indicating the dense spacings.
   */
  dense?: boolean;
}

export function Button({ children, dense, ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${dense ? styles.dense : ''}`} {...props}>
      {children}
    </button>
  );
}
export default Button;
