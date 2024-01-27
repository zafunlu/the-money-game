"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "../components/snackbar/snackbar-context";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  usersActions,
  logout,
  selectCurrentUser,
  fetchCurrentUser,
  selectCurrentUserStatus,
} from "@/lib/features/users/usersSlice";
import { ThunkStatus } from "@/lib/thunk";

type AuthContext = {
  signout: () => void;
  signin: (user: any, token: string) => void;
  isLoggedIn: boolean;
  isLoading: ThunkStatus;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContext | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUser);
  const isLoading = useAppSelector(selectCurrentUserStatus);

  const { showSnackbar } = useSnackbar();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const signout = useCallback(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("current_user");
    dispatch(logout());
    setIsLoggedIn(false);
    router.push("/signin");
    showSnackbar("You have been successfully signed out");
  }, [dispatch, showSnackbar, router]);

  const signin = useCallback(
    (user: any, token: string) => {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("current_user", user.id);
      dispatch(usersActions.setUser(user));
      setIsLoggedIn(true);
      showSnackbar(`You are now signed in as @${user.username}`);
      router.push("/dashboard");
    },
    [router, showSnackbar, dispatch]
  );

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("auth_token") && !!localStorage.getItem("current_user"));
  }, []);

  useEffect(() => {
    if (isLoggedIn && !currentUser) {
      dispatch(fetchCurrentUser());
    }
  }, [isLoggedIn, currentUser, dispatch]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
