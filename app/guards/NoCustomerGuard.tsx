"use client";

import { useRouter } from "next/navigation";
import { useCustomerAuth } from "./CustomerAuthContext";
import { useEffect } from "react";

type NoCustomerGuardProps = { children: React.ReactNode };

export function NoCustomerGuard({ children }: NoCustomerGuardProps) {
  const { isLoggedIn } = useCustomerAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/customer");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return children;
  }
  return <></>;
}
