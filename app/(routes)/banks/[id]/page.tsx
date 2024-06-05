"use client";

import {
  customerAction,
  selectCustomers,
} from "@/lib/features/customers/customerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { AddCustomerDialog } from "./dialogs/AddCustomerDialog";
import { BulkTransferDialog } from "./dialogs/BulkTransferDialog";
import { CustomersTable } from "./CustomersTable";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { Switch } from "@/app/components/switch/Switch";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { useState } from "react";

export default function BankPage() {
  const dialogs = useAppSelector((state) => state.dialogs);
  const dispatch = useAppDispatch();
  const customers = useAppSelector(selectCustomers);
  const [customerSearch, setCustomerSearch] = useState("");
  const isCustomerSelectionOn = useAppSelector(
    (state) => state.customers.isMultiSelectEnabled
  );
  const numberOfSelectedCustomers = useAppSelector(
    (state) => Object.keys(state.customers.selectedCustomers).length
  );

  const searchCustomers = (
    <form className="-mt-4">
      <div className="form-field">
        <label htmlFor="customer-search">Customer Search</label>
        <input
          id="customer-search"
          name="customerSearch"
          type="text"
          placeholder="Search for customer..."
          onChange={handleCustomerSearch}
        />
      </div>
    </form>
  );

  function handleCustomerSearch(event: any): void {
    setCustomerSearch(event.target.value);
  }

  function openAddCustomerDialog() {
    dispatch(dialogsAction.openAddCustomerDialog());
  }

  function handleSwitch(value: boolean): void {
    dispatch(customerAction.setMultiSelect(value));

    if (!value) {
      dispatch(customerAction.clearSelected());
    }
  }

  function openBulkTransferDialog(): void {
    dispatch(dialogsAction.openBulkTransfer());
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <button onClick={openAddCustomerDialog} className="sm common filled">
            <MatIcon icon="add" />
            Nieuwe leerling
          </button>
        </div>

        {customers?.length > 6 ? searchCustomers : null}
        {customers?.length > 1 && (
          <div
            className={`text-sm flex gap-2 items-center -my-2 ${
              customers?.length > 6
                ? "justify-end flex-row-reverse"
                : "justify-start flex-row-reverse"
            }`}
          >
            <Switch
              id="okay"
              onChange={handleSwitch}
              enabled={isCustomerSelectionOn}
            >
              Bulk Transfer
            </Switch>
          </div>
        )}
        <CustomersTable filterValue={customerSearch} />
      </div>
      {dialogs.addCustomer && <AddCustomerDialog />}
      {dialogs.bulkTransfer && <BulkTransferDialog />}
      {numberOfSelectedCustomers > 0 && !dialogs.bulkTransfer && (
        <button
          className="fixed bottom-5 right-5 bg-orange-200 px-5 py-3 rounded-[20px] shadow animate-bounce"
          onClick={openBulkTransferDialog}
        >
          Continue Bulk Transfer ({numberOfSelectedCustomers})
        </button>
      )}
    </>
  );
}
