"use client";

import { AccountDashboard } from "@/app/(routes)/accounts/[id]/AccountDashboard";
import { CustomerGuard } from "@/app/guards/CustomerGuard";
import { fetchAccount, selectAccount } from "@/lib/features/accounts/accountsSlice";
import { appBarActions } from "@/lib/features/app-bar/appBarSlice";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

export default function CustomerAccountPage({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectAccount);

  useEffect(() => {
    dispatch(fetchAccount(params.id));
    dispatch(appBarActions.displayGoBack());
    dispatch(dialogsAction.closeViewCustomer());

    return () => {
      dispatch(appBarActions.displayDefault());
    };
  }, [dispatch, params.id]);

  if (params.id && !account) {
    return <>Loading...</>;
  }

  return (
    <CustomerGuard>
      <AccountDashboard account={account} />
    </CustomerGuard>
  );
}
