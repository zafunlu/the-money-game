"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { useSnackbar } from "../components/snackbar/snackbar-context";
import { ThunkStatus } from "@/lib/thunk";

type AuthenticatedRouteProps = { children: React.ReactNode };

export function AuthenticatedGuard({ children }: AuthenticatedRouteProps) {
  const { isLoading, isLoggedIn } = useAuth();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (isLoading !== ThunkStatus.Idle && isLoading !== ThunkStatus.Loading && !isLoggedIn) {
      router.push("/signin");
      showSnackbar("You need to be signed in to do that");
    }
  }, [isLoading, isLoggedIn, router, showSnackbar]);

  if (isLoggedIn) {
    return children;
  }

  return <></>;
}
