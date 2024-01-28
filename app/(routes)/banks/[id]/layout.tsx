"use client";

import { Notice } from "@/app/components/notice/Notice";
import { AuthenticatedGuard } from "@/app/guards/AuthGuard";
import {
  fetchBank,
  fetchEmployees,
  selectCurrentBank,
  selectCurrentBankStatus,
} from "@/lib/features/banks/banksSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BankSidebar } from "./BankSidebar";
import { CopyNotice } from "./CopyNotice";
import { Card } from "@/app/components/card/Card";
import { BankHeader } from "./BankHeader";
import { TabsInfo, Tabs } from "@/app/components/tabs/Tabs";
import { ThunkStatus } from "@/lib/thunk";
import { fetchCustomers } from "@/lib/features/customers/customerSlice";

type BankLayoutProps = { children: React.ReactNode };
export default function BankLayout({ children }: BankLayoutProps) {
  const params = useParams();
  const dispatch = useAppDispatch();

  const bank = useAppSelector(selectCurrentBank);
  const bankStatus = useAppSelector(selectCurrentBankStatus);

  const [tabs, setTabs] = useState<TabsInfo[]>([]);

  useEffect(() => {
    dispatch(fetchBank(params.id as string));
    dispatch(fetchEmployees(params.id as string));
    dispatch(fetchCustomers(params.id as string));
  }, [dispatch, params.id]);

  useEffect(() => {
    setTabs([
      { link: `/banks/${params.id}`, displayText: "Customers" },
      { link: `/banks/${params.id}/settings`, displayText: "Settings" },
    ]);
  }, [params]);

  if (bankStatus === ThunkStatus.Loading) {
    return (
      <AuthenticatedGuard>
        <main className="flex flex-col md:flex-row gap-4 container">
          <div className="flex flex-col gap-4">
            <CopyNotice />
            <Card className="flex flex-col gap-4 w-full" type="outlined">
              Loading...
            </Card>
          </div>
          <BankSidebar bank={bank} />
        </main>
      </AuthenticatedGuard>
    );
  }

  if (!bank) {
    return (
      <AuthenticatedGuard>
        <main className="container">
          <Notice icon="error-outline">
            <div className="w-full text-center">
              Something happened while trying to retrieve the bank
            </div>
          </Notice>
        </main>
      </AuthenticatedGuard>
    );
  }

  return (
    <AuthenticatedGuard>
      <main className="flex flex-col md:flex-row gap-4 container">
        <div className="flex flex-col gap-4">
          <CopyNotice />
          <Card className="flex flex-col gap-4 w-full" type="outlined">
            <BankHeader bank={bank} />
            <Tabs tabs={tabs}>{children}</Tabs>
          </Card>
        </div>
        <BankSidebar bank={bank} />
      </main>
    </AuthenticatedGuard>
  );
}
