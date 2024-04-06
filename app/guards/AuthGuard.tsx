"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { useSnackbar } from "../components/snackbar/snackbar-context";
import { ThunkStatus } from "@/lib/thunk";
import { createAds } from "../utils/create-ads";
import { useAppSelector } from "@/lib/hooks";
import { selectFeatures } from "@/lib/features/config/configSlice";

type AuthenticatedRouteProps = { children: React.ReactNode };

export function AuthenticatedGuard({ children }: AuthenticatedRouteProps) {
  const { isLoading, isLoggedIn, signout } = useAuth();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const features = useAppSelector(selectFeatures);

  useEffect(() => {
    if (
      isLoading === ThunkStatus.Error ||
      (isLoading !== ThunkStatus.Idle && isLoading !== ThunkStatus.Loading && !isLoggedIn)
    ) {
      signout();
      router.push("/signin");
      showSnackbar("You need to be signed in to do that");
    }
  }, [isLoading, isLoggedIn, router, signout, showSnackbar]);

  useEffect(() => {
    if (features?.ads && isLoading !== ThunkStatus.Success && isLoggedIn) {
      createAds();
    }
  }, [isLoading, isLoggedIn, features]);

  if (isLoggedIn && isLoading !== ThunkStatus.Error) {
    return children;
  }

  return <></>;
}
