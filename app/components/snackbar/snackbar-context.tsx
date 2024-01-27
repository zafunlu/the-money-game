"use client";

import { createContext, useContext, useState } from "react";
import { Snackbar } from "./Snackbar";

type SnackbarContextProviderProps = {
  children: React.ReactNode;
};

type SnackbarContext = {
  showSnackbar: (message: string, actionText?: string, timeout?: number) => void;
  hideSnackbar: () => void;
};

const SnackbarContext = createContext<SnackbarContext | null>(null);

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarContextProvider");
  }
  return context;
}

export default function SnackbarContextProvider({ children }: SnackbarContextProviderProps) {
  const [message, setMessage] = useState("");
  const [actionText, setActionText] = useState("Dismiss");
  const [isVisible, setIsVisible] = useState(false);

  function showSnackbar(message: string, actionText = "Dismiss", timeout = 4_000): void {
    setMessage(message);
    setActionText(actionText);
    setIsVisible(true);

    if (timeout > 0) {
      setTimeout(() => {
        hideSnackbar();
      }, timeout);
    }
  }

  function hideSnackbar(): void {
    setIsVisible(false);
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar, hideSnackbar }}>
      {children}
      {<Snackbar message={message} actionText={actionText} isVisible={isVisible} />}
    </SnackbarContext.Provider>
  );
}
