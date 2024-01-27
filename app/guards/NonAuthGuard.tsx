"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

type NonAuthenticatedRouteProps = { children: React.ReactNode };

export function NonAuthenticatedGuard({ children }: NonAuthenticatedRouteProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return children;
  }
  return <></>;
}
