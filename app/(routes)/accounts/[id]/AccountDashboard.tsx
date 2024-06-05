"use client";

import {
  constructDate,
  formatCurrency,
  formatDate,
} from "@/app/utils/formatters";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

import { AccountStatementDocument } from "./AccountStatementDocument";
import { AccountTransferDialog } from "../../banks/[id]/dialogs/AccountTransferDialog";
import { BankBuddyTransferDialog } from "../../banks/[id]/dialogs/BankBuddyTransferDialog";
import { Card } from "@/app/components/card/Card";
import { EditAccountNameDialog } from "./EditNameDialog";
import { GET } from "@/app/utils/http-client";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { Notice } from "@/app/components/notice/Notice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { RecentTransactions } from "./RecentTransactions";
import { TransactionBreakdownChart } from "./TransactionBreakdownChart";
import { TransferMoneyDialog } from "../../banks/[id]/dialogs/TransferMoneyDialog";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { selectCustomer } from "@/lib/features/customers/customerSlice";
import { selectFeatures } from "@/lib/features/config/configSlice";
import { useAuth } from "@/app/guards/AuthContext";

type AccountDashboardProps = { account: any };

export function AccountDashboard({ account }: AccountDashboardProps) {
  const dispatch = useAppDispatch();
  const customer = useAppSelector(selectCustomer);
  const dialogs = useAppSelector((state) => state.dialogs);
  const [statement, setStatement] = useState([]);
  const { isLoggedIn } = useAuth();
  const statementMonth =
    new Date().getMonth() - 1 < 0 ? 11 : new Date().getMonth();
  const statementYear =
    statementMonth === 11
      ? new Date().getFullYear() - 1
      : new Date().getFullYear();
  const statementEndMonth = statementMonth === 11 ? 0 : statementMonth + 1;
  const statementEndYear =
    statementMonth === 11
      ? new Date().getFullYear() + 1
      : new Date().getFullYear();
  const featureFlags = useAppSelector(selectFeatures);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await GET(
          `/accounts/${account.id}/transactions?status=approved&startDate=${statementYear}-${statementMonth}-1&endDate=${statementEndYear}-${statementEndMonth}-1&limit=250&direction=ASC`
        );

        if (!response.ok) return;

        const data = await response.json();
        setStatement(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    if (account) {
      fetchAccount();
    }
  }, [
    account,
    statementEndMonth,
    statementEndYear,
    statementMonth,
    statementYear,
  ]);

  function openTransferMoneyDialog(): void {
    dispatch(dialogsAction.openTransferMoney());
  }

  function openEditDialog(): void {
    dispatch(dialogsAction.openEditAccount());
  }

  function openBankBuddyTransferDialog(): void {
    dispatch(dialogsAction.openBankBuddyTransfer());
  }

  function openAccountTransferDialog(): void {
    dispatch(dialogsAction.openAccountTransfer());
  }

  function getStatementAsCSV(): any[] {
    return statement.map((row: any) => {
      return [
        row.updated_at.slice(0, 10),
        row.description.replace(",", ""),
        row.amount < 0 ? formatCurrency(row.amount) : "",
        row.amount >= 0 ? formatCurrency(row.amount) : "",
        formatCurrency(row.current_balance),
      ];
    });
  }

  if (!customer || !account) {
    return <div>Laden...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex flex-col gap-2 text-center py-2">
          <div className="flex items-center justify-center gap-1 text-xl">
            <div>
              <span className="capitalize">
                {customer.first_name} {customer.last_name}
              </span>{" "}
              &mdash; <span className="capitalize">{account.name}</span>
            </div>
            {isLoggedIn && (
              <button onClick={openEditDialog} className="icon ghost">
                <MatIcon icon="edit-outline" />
              </button>
            )}
          </div>
          <span className="text-3xl font-extrabold">
            {formatCurrency(account.balance)}
          </span>
          <div className="flex justify-center gap-2">
            <button
              onClick={openTransferMoneyDialog}
              className="font-normal underline text-primary"
            >
              Geld Opnemen of Storten
            </button>
            &middot;
            <button
              onClick={openBankBuddyTransferDialog}
              className="font-normal underline text-primary"
            >
              Geld Overmaken
            </button>
          </div>
          {featureFlags?.account_transfers && (
            <div className="flex items-center justify-center">
              {customer.accounts.length > 1 ? (
                <div>
                  <button
                    onClick={openAccountTransferDialog}
                    className="font-normal underline text-primary"
                  >
                    Overboeken Tussen Rekeningen
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </Card>
      {statement.length > 0 && (
        <Notice icon="receipt-long-outline" type="info">
          <div className="flex justify-between w-full items-center">
            <div>Je hebt een bankafschrift van afgelopen maand klaar!</div>
            <PDFDownloadLink
              fileName={`${formatDate(
                constructDate(statementYear, statementMonth),
                {
                  month: "long",
                  year: "numeric",
                  day: undefined,
                }
              )}-${account.name.toUpperCase()}-${customer.first_name.toLowerCase()}-${customer.last_name.toLowerCase()}`}
              document={
                <AccountStatementDocument
                  account={account}
                  customer={customer}
                  data={getStatementAsCSV()}
                />
              }
            >
              Downloaden
            </PDFDownloadLink>
          </div>
        </Notice>
      )}
      <Card type="outlined">
        <h1>Deze maand</h1>
        <TransactionBreakdownChart account={account} />
      </Card>
      <RecentTransactions account={account} />
      {dialogs.transferMoney && <TransferMoneyDialog />}
      {dialogs.editAccount && <EditAccountNameDialog />}
      {dialogs.bankBuddyTransfer && <BankBuddyTransferDialog />}
      {dialogs.accountTransfer && <AccountTransferDialog />}
    </div>
  );
}
