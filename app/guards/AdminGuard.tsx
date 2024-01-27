"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";
import { selectCurrentUser } from "@/lib/features/users/usersSlice";
import { useAppSelector } from "@/lib/hooks";
import { useSnackbar } from "../components/snackbar/snackbar-context";
import { UserRole } from "@/lib/models/User";

type AdminGuardProps = { children: React.ReactNode };

export function AdminGuard({ children }: AdminGuardProps) {
  const { isLoading, isLoggedIn } = useAuth();
  const user = useAppSelector(selectCurrentUser);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/signin");
      showSnackbar("You need to be signed in first");
    } else if (user && user.role !== UserRole.Admin) {
      router.push("/dashboard");
      showSnackbar("You do not have access to that");
    }
  }, [isLoading, isLoggedIn, router, showSnackbar, user]);

  if (isLoggedIn) {
    return children;
  }

  return <></>;
}
