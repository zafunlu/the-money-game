"use client";

import { useRouter } from "next/navigation";
import { useCustomerAuth } from "./CustomerAuthContext";
import { useEffect } from "react";

type CustomerGuardProps = { children: React.ReactNode };

export function CustomerGuard({ children }: CustomerGuardProps) {
  const { isLoggedIn } = useCustomerAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(sessionStorage.getItem("last_bank") ?? "/");
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return children;
  }
  return <></>;
}
