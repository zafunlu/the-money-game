"use client";

import {
  customerAction,
  selectCustomer,
  selectCustomerTotalBalance,
} from "@/lib/features/customers/customerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { Dialog } from "@/app/components/dialog/Dialog";
import Link from "next/link";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { PUT } from "@/app/utils/http-client";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { formatCurrency } from "@/app/utils/formatters";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/app/components/snackbar/snackbar-context";

export function ViewCustomerDialog() {
  const dispatch = useAppDispatch();
  const customer = useAppSelector(selectCustomer);
  const customersTotalBalance = useAppSelector(selectCustomerTotalBalance);
  const { showSnackbar } = useSnackbar();
  const router = useRouter();

  function closeDialog(): void {
    dispatch(customerAction.setCustomer(null));
    dispatch(dialogsAction.closeViewCustomer());
  }

  async function openAccount(): Promise<void> {
    try {
      const response = await PUT("/accounts", {
        name: "Betaalaccount#2",
        customer_id: customer?.id,
      });
      const data = (await response.json()) as any;

      if (response.ok) {
        router.push(`/accounts/${data.id}`);
        showSnackbar("Succesvol een nieuwe rekening geopend");
      } else {
        showSnackbar(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog>
      <header>
        <MatIcon icon="account-circle" />
        <div className="flex flex-col gap-2 items-center">
          <h1 className="capitalize">
            {customer?.first_name} {customer?.last_name}
          </h1>
          <div className="flex flex-wrap justify-center gap-2">
            <div className="pill bg-tonal border border-outline shrink-0">
              <MatIcon className="w-5 h-5" icon="wallet" />{" "}
              <strong className="hidden md:inline">Netto waarde</strong>{" "}
              {formatCurrency(customersTotalBalance)}
            </div>
            <div className="pill bg-tonal border border-outline">
              <MatIcon className="w-5 h-5" icon="password" />{" "}
              <strong className="hidden md:inline">PIN</strong> {customer?.pin}
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="flex flex-col gap-3">
          <h2 className="font-extrabold">Bankieren</h2>
          <div>
            <div className="grid grid-cols-2 border border-outline rounded-t-xl px-3 py-1 bg-gray-200 font-bold">
              <div>Rekening</div>
              <div className="text-right">Balans</div>
            </div>
            {customer?.accounts.map((account: any) => {
              return (
                <Link
                  href={`/accounts/${account.id}`}
                  key={account.id}
                  className="grid grid-cols-2 border border-outline border-t-0 last:rounded-b-xl px-3 py-2 bg-white duration-300 transition-colors ease-in hover:bg-slate-100 cursor-pointer text-inherit hover:text-inherit no-underline"
                >
                  <div className="flex gap-2 items-center">
                    {account.name}
                    {account.is_primary && customer.accounts.length > 1 ? (
                      <div className="pill text-xs bg-tonal">Primair</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="text-right font-bold">
                    {formatCurrency(account.balance)}&nbsp;&nbsp;&rsaquo;
                  </div>
                </Link>
              );
            })}
          </div>
          {(customer?.accounts.length ?? 5) < 2 && (
            <div>
              <button onClick={openAccount} className="-mt-2 common sm ghost">
                + Rekening openen
              </button>
            </div>
          )}
        </section>
      </main>
      <footer>
        <button className="common ghost" onClick={closeDialog}>
          Sluiten
        </button>
      </footer>
    </Dialog>
  );
}
