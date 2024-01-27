"use client";

import styles from "./Snackbar.module.scss";
import { useSnackbar } from "./snackbar-context";

type SnackbarParams = {
  message: string;
  actionText?: string;
  isVisible: boolean;
};
export function Snackbar({ message, actionText, isVisible }: SnackbarParams) {
  const { hideSnackbar } = useSnackbar();

  return (
    <div className={`${styles.snackbar} ${isVisible ? styles.show : ""}`}>
      <div className={styles.content}>
        {message}
        <button className="shrink-0" onClick={hideSnackbar}>
          {actionText ?? "Dismiss"}
        </button>
      </div>
    </div>
  );
}
