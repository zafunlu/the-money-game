"use client";

import { Card } from "@/app/components/card/Card";
import { AuthenticatedGuard } from "@/app/guards/AuthGuard";
import {
  fetchAccount,
  selectAccount,
  selectAccountStatus,
} from "@/lib/features/accounts/accountsSlice";
import { fetchCustomer } from "@/lib/features/customers/customerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ThunkStatus } from "@/lib/thunk";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { appBarActions } from "@/lib/features/app-bar/appBarSlice";
import { AccountDashboard } from "./AccountDashboard";

export default function AccountsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccount);
  const accountStatus = useAppSelector(selectAccountStatus);

  useEffect(() => {
    dispatch(fetchAccount(id as string));
    dispatch(appBarActions.displayGoBack());
    dispatch(dialogsAction.closeViewCustomer());

    return () => {
      dispatch(appBarActions.displayDefault());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (account) {
      dispatch(fetchCustomer(account.customer_id));
    }
  }, [dispatch, account]);

  if (accountStatus === ThunkStatus.Idle || accountStatus === ThunkStatus.Loading) {
    return (
      <AuthenticatedGuard>
        <main className="container max-w-xl">
          <Card type="outlined">Loading...</Card>
        </main>
      </AuthenticatedGuard>
    );
  }

  return (
    <AuthenticatedGuard>
      <main className="container max-w-3xl">
        <AccountDashboard account={account} />
      </main>
    </AuthenticatedGuard>
  );
}
