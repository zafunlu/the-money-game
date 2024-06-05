"use client";

import {
  fetchApprovals,
  selectPendingApprovals,
} from "@/lib/features/pending-transactions/pendingTransactionsSlice";
import { formatCurrency, formatDate } from "@/app/utils/formatters";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { AuthenticatedGuard } from "@/app/guards/AuthGuard";
import { Card } from "@/app/components/card/Card";
import { PATCH } from "@/app/utils/http-client";
import { useSnackbar } from "@/app/components/snackbar/snackbar-context";

export default function ApprovalsPage() {
  const dispatch = useAppDispatch();
  const pendingTransactions = useAppSelector(selectPendingApprovals);
  const { showSnackbar } = useSnackbar();

  async function approve(transaction: any): Promise<void> {
    try {
      const response = await PATCH(
        `/transactions/${transaction.id}/approve`,
        {}
      );

      if (response.ok) {
        showSnackbar(`Transactie goedgekeurd voor ${transaction.description}`);
        dispatch(fetchApprovals());
      } else {
        const { message } = await response.json();
        showSnackbar(message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function decline(transaction: any): Promise<void> {
    try {
      const response = await PATCH(
        `/transactions/${transaction.id}/decline`,
        {}
      );

      if (response.ok) {
        showSnackbar(`Transactie afgewezen voor ${transaction.description}`);
        dispatch(fetchApprovals());
      } else {
        const { message } = await response.json();
        showSnackbar(message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthenticatedGuard>
      <main className="container max-w-xl">
        <Card className="flex flex-col" type="outlined">
          <h1>In afwachting van goedkeuring</h1>
          {pendingTransactions.length === 0 ? (
            <div className="flex flex-col gap-2 text-gray-500">
              <p>
                Je bent helemaal bij met goedkeuringen! Goed gedaan om overal
                bovenop te blijven. 👏
              </p>
              <p>
                Toekomstige verzoeken van je leerlingen verschijnen hier voor
                jou om goed te keuren of af te wijzen. Voor nu kun je gerust
                zijn. 😌
              </p>
            </div>
          ) : (
            <ul className="mt-3">
              {pendingTransactions.map((transaction) => {
                return (
                  <li
                    className="border-t pt-5 mt-5 first:mt-0"
                    key={transaction.id}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-gray-500 text-xs">
                          <span className="capitalize">
                            {transaction.account.customer.first_name}{" "}
                            {transaction.account.customer.last_name}
                          </span>{" "}
                          &mdash; {transaction.account.name}
                        </div>
                        <div className="font-extrabold text-2xl">
                          {formatCurrency(transaction.amount)}
                        </div>
                        <div className="flex flex-col gap-1 text-gray-500 text-xs">
                          <div>OPMERKING: {transaction.description}</div>
                          <div>
                            {formatDate(transaction.created_at, {
                              hour: "numeric",
                              minute: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-end gap-2 shrink-0">
                        <button
                          onClick={() => approve(transaction)}
                          className="common outlined sm"
                        >
                          Goedkeuren
                        </button>
                        <button
                          onClick={() => decline(transaction)}
                          className="common outlined-error sm"
                        >
                          Afwijzen
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </main>
    </AuthenticatedGuard>
  );
}
