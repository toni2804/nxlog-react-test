import { ReactNode } from "react";
import styles from "src/components/Task/Task.module.scss";

interface TaskProps {
  title: string;
  children: ReactNode;
}

export function Task({ title, children }: TaskProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
export default Task;
