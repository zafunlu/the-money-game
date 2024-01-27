"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useSnackbar } from "../components/snackbar/snackbar-context";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  customerAction,
  fetchCustomer,
  selectCustomer,
} from "@/lib/features/customers/customerSlice";
import { useRouter } from "next/navigation";

type CustomerAuthContext = {
  signin: (customer: any, token: string) => void;
  signout: () => void;
  isLoggedIn: boolean;
};

type CustomerAuthContextProviderProps = {
  children: React.ReactNode;
};

const CustomerAuthContext = createContext<CustomerAuthContext | null>(null);

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext);

  if (!context) {
    throw new Error("useCustomerAuth must be used within a CustomerAuthContextProvider");
  }
  return context;
}

export default function CustomerAuthContextProvider({
  children,
}: CustomerAuthContextProviderProps) {
  const router = useRouter();
  const customer = useAppSelector(selectCustomer);
  const dispatch = useAppDispatch();
  const { showSnackbar } = useSnackbar();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const customerId = sessionStorage.getItem("customer");
    const authToken = sessionStorage.getItem("auth_token");

    setIsLoggedIn(!!(customerId && authToken));
  }, []);

  useEffect(() => {
    const customerId = sessionStorage.getItem("customer");

    if (isLoggedIn && !customer) {
      dispatch(fetchCustomer(customerId as string));
      setIsLoggedIn(true);
    }
  }, [customer, dispatch, isLoggedIn]);

  const signin = useCallback(
    (customer: any, token: string) => {
      sessionStorage.setItem("customer", customer.id);
      sessionStorage.setItem("auth_token", token);
      dispatch(customerAction.setCustomer(customer));
      setIsLoggedIn(true);
      showSnackbar("You have successfully signed in to your account");
      router.push("/customer");
    },
    [dispatch, showSnackbar, router]
  );

  function signout(): void {
    sessionStorage.removeItem("auth_token");
    sessionStorage.removeItem("customer");
    setIsLoggedIn(false);
    router.push(sessionStorage.getItem("last_bank") ?? "/");
  }

  return (
    <CustomerAuthContext.Provider value={{ signin, signout, isLoggedIn }}>
      {children}
    </CustomerAuthContext.Provider>
  );
}
