import { ReactNode } from "react";

interface TaskProps {
  title: string;
  children: ReactNode;
}
export function Task({ title, children }: TaskProps) {
  return (
    <>
      <h2>{title}</h2>
      <div>{children}</div>
    </>
  );
}
export default Task;
