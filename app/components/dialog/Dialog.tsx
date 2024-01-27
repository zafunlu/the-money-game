import { Card } from "../card/Card";
import styles from "./Dialog.module.scss";

type DialogProps = {
  className?: string;
  children: React.ReactNode;
};

export function Dialog({ children, className }: DialogProps) {
  return (
    <div className={`${styles.dialog} ${className}`}>
      <Card>{children}</Card>
    </div>
  );
}
