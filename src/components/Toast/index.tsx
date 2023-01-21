import { useEffect } from "react";
import styles from "src/components/Toast/Toast.module.scss";

export type ToastVariant = "success" | "error";

interface ToastProps {
  variant: ToastVariant;
  message: string;
  autoclose?: boolean;
  onClose?: () => void;
}

export function Toast({ variant, message, autoclose, onClose }: ToastProps) {
  useEffect(() => {
    if (autoclose && onClose) setTimeout(onClose, 3000);
  }, [onClose, autoclose]);
  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      <div>{message}</div>
      <span className={styles.close} onClick={onClose}>
        &#x2715;
      </span>
    </div>
  );
}
export default Toast;
