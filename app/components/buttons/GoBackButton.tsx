"use client";

import { appBarActions } from "@/lib/features/app-bar/appBarSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";

export function GoBackButton({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  function handleGoBack(): void {
    dispatch(appBarActions.displayDefault());

    if (window.history.length > 2) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <button
      className="icon relative group"
      onClick={handleGoBack}
      aria-label="Navigation Back Menu Button"
    >
      {children}
    </button>
  );
}
