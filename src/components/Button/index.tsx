import { ButtonHTMLAttributes } from "react";
import styles from "src/components/Button/Button.module.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The flag indicating dense spacings.
   */
  dense?: boolean;
}

export function Button({ children, dense, ...props }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${dense ? styles.dense : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;
