"use client";

import { AMOUNT_TOO_LARGE, hasErrors } from "@/app/utils/form-validators";
import {
  fetchAccount,
  selectAccount,
} from "@/lib/features/accounts/accountsSlice";
import {
  fetchCustomer,
  fetchCustomers,
  selectCustomer,
} from "@/lib/features/customers/customerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRef, useState } from "react";

import { Dialog } from "@/app/components/dialog/Dialog";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { PUT } from "@/app/utils/http-client";
import { SegmentedButton } from "@/app/components/buttons/SegmentedButton";
import { Switch } from "@/app/components/switch/Switch";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { formatCurrency } from "@/app/utils/formatters";
import { useAuth } from "@/app/guards/AuthContext";
import { useSnackbar } from "@/app/components/snackbar/snackbar-context";

export function TransferMoneyDialog() {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const customer = useAppSelector(selectCustomer);
  const account = useAppSelector(selectAccount);
  const { isLoggedIn } = useAuth();
  const { showSnackbar } = useSnackbar();
  const [keepOpen, setKeepOpen] = useState(false);

  const [formData, setFormData] = useState({
    transactionType: "",
    accountId: !!account ? account.id : customer?.accounts[0].id + "",
    amount: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState({
    transactionType: "",
    accountId: "",
    amount: "",
    description: "",
  });

  function closeTransferMoneyDialog() {
    dispatch(dialogsAction.closeTransferMoney());

    if (isLoggedIn) {
      dispatch(fetchCustomers(customer!.bank_id));
    }
  }

  function handleChange(event: any) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  }

  function validateField(name: keyof typeof formData, value: string) {
    const errors = { ...formErrors };

    if (!value) {
      setFormErrors({ ...formErrors, [name]: "" });
      return;
    }

    switch (name) {
      case "amount":
        const amount = parseFloat(value.replace(/[^\d.]/g, ""));

        if (amount > 250_000_000) {
          errors.amount = AMOUNT_TOO_LARGE;
        } else if (amount === 0) {
          errors.amount = "Moet groter zijn dan 0";
        } else {
          errors.amount = "";
          setFormData({ ...formData, amount: amount.toString() });
        }
        break;
      case "description":
        if (value.length > 35) {
          errors.description = "Beschrijving mag slechts 35 tekens bevatten";
        }
        break;
    }

    setFormErrors(errors);
  }

  function formatAmount(event: any): void {
    const numericValue = parseFloat(formData.amount.replace(/[^\d.]/g, ""));

    if (!isNaN(numericValue)) {
      const formattedValue = formatCurrency(numericValue);
      event.target.value = formattedValue;
    } else {
      event.target.value = "";
    }
  }

  function isInvalid() {
    return (
      Object.values(formData).some((value) => !value) || hasErrors(formErrors)
    );
  }

  function resetForm(): void {
    formRef.current?.reset();
    setFormData({
      transactionType: "",
      accountId: !!account ? account.id : customer?.accounts[0].id + "",
      amount: "",
      description: "",
    });
  }

  async function createTransfer(event: any) {
    event.preventDefault();

    const isWithdraw = formData.transactionType === "withdraw";
    const payload = {
      account_id: parseInt(formData.accountId + "", 10),
      description: formData.description,
      amount: parseFloat(formData.amount) * (isWithdraw ? -1 : 1),
    };

    try {
      const response = await PUT("/transactions", payload);

      if (response.ok) {
        if (!keepOpen) {
          closeTransferMoneyDialog();
        }

        if (isLoggedIn) {
          if (!keepOpen) {
            dispatch(fetchCustomers(customer!.bank_id));
          } else {
            resetForm();
          }
          showSnackbar(
            `Succesvol ${isWithdraw ? "opgenomen" : "gestort"} ${formatCurrency(
              parseFloat(formData.amount)
            )} ${isWithdraw ? "van" : "op"} de rekening`
          );
        } else {
          dispatch(fetchCustomer(customer!.id));
          showSnackbar(
            "Succesvol een verzoek aangemaakt. Wacht alstublieft terwijl uw bank deze transactie goedkeurt of afwijst"
          );
        }

        dispatch(fetchAccount(formData.accountId));
      } else {
        const { message } = await response.json();
        showSnackbar(message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog>
      <header>
        <MatIcon icon="price-change-outline" />
        <h1 className="capitalize">
          Overboekingsverzoek voor {customer?.first_name}
        </h1>
      </header>
      <form
        ref={formRef}
        className="flex flex-col gap-3"
        onSubmit={createTransfer}
      >
        <main className="flex flex-col gap-2">
          <SegmentedButton>
            <input
              id="transaction_type_deposit"
              name="transactionType"
              type="radio"
              value="deposit"
              onChange={handleChange}
              checked={formData.transactionType === "deposit"}
            />
            <label htmlFor="transaction_type_deposit" className="w-1/2">
              Storten
            </label>
            <input
              id="transaction_type_withdraw"
              name="transactionType"
              type="radio"
              value="withdraw"
              onChange={handleChange}
              checked={formData.transactionType === "withdraw"}
            />
            <label htmlFor="transaction_type_withdraw" className="w-1/2">
              Opnemen
            </label>
          </SegmentedButton>
          {(customer?.accounts.length ?? 1) > 1 && !account && (
            <div className="form-field">
              <label htmlFor="select_account">Selecteer Rekening</label>
              <select
                id="select_account"
                name="accountId"
                disabled={!customer || customer.accounts.length === 1}
                onChange={handleChange}
              >
                {customer?.accounts.map((account) => {
                  return (
                    <option key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(account.balance ?? 0)}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          <div className={`form-field ${formErrors.amount && "error"}`}>
            <label htmlFor="transfer_money_dialog_amount">Bedrag</label>
            <input
              id="transfer_money_dialog_amount"
              type="text"
              name="amount"
              inputMode="decimal"
              maxLength={15}
              onChange={handleChange}
              onBlur={formatAmount}
            />
            <div className="error-message">{formErrors.amount}</div>
          </div>
          <div className="form-field">
            <label htmlFor="transfer_money_dialog_description">
              Beschrijving
            </label>
            <input
              id="transfer_money_dialog_description"
              name="description"
              maxLength={35}
              onChange={handleChange}
              placeholder="Voer een korte beschrijving in"
              type="text"
            />
          </div>
        </main>
        {isLoggedIn && (
          <div className="w-full flex gap-2 items-center text-sm">
            <Switch
              id="test"
              onChange={(checked) => {
                setKeepOpen(checked);
              }}
              enabled={keepOpen}
            >
              Open houden?
            </Switch>
          </div>
        )}
        <footer>
          <input
            type="reset"
            onClick={closeTransferMoneyDialog}
            className="common ghost"
            value="Annuleren"
          />
          <input
            type="submit"
            value="Voltooien"
            className="common ghost"
            disabled={isInvalid()}
          />
        </footer>
      </form>
    </Dialog>
  );
}
