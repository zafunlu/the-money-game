"use client";

import { useRouter } from "next/navigation";
import { useCustomerAuth } from "./CustomerAuthContext";
import { useEffect } from "react";
import { createAds } from "../utils/create-ads";
import { useAppSelector } from "@/lib/hooks";
import { selectFeatures } from "@/lib/features/config/configSlice";

type CustomerGuardProps = { children: React.ReactNode };

export function CustomerGuard({ children }: CustomerGuardProps) {
  const { isLoggedIn } = useCustomerAuth();
  const router = useRouter();
  const featureFlags = useAppSelector(selectFeatures);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push(sessionStorage.getItem("last_bank") ?? "/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (featureFlags?.ads && isLoggedIn) {
      createAds();
    }
  }, [isLoggedIn, featureFlags]);

  if (isLoggedIn) {
    return children;
  }
  return <></>;
}
