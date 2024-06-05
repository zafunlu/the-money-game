"use client";

import { Tabs, TabsInfo } from "@/app/components/tabs/Tabs";
import {
  fetchBank,
  fetchEmployees,
  selectCurrentBank,
  selectCurrentBankStatus,
} from "@/lib/features/banks/banksSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

import { AuthenticatedGuard } from "@/app/guards/AuthGuard";
import { BankHeader } from "./BankHeader";
import { BankSidebar } from "./BankSidebar";
import { Card } from "@/app/components/card/Card";
import { CopyNotice } from "./CopyNotice";
import { Notice } from "@/app/components/notice/Notice";
import { ThunkStatus } from "@/lib/thunk";
import { fetchCustomers } from "@/lib/features/customers/customerSlice";
import { useParams } from "next/navigation";

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
      { link: `/banks/${params.id}`, displayText: "Leerlingen" },
      { link: `/banks/${params.id}/settings`, displayText: "Instellingen" },
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
