import styles from "./SegmentedButton.module.scss";

type SegmentedButtonProps = { children: React.ReactNode };

export function SegmentedButton({ children }: SegmentedButtonProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.segmentedButton}>{children}</div>
    </div>
  );
}
