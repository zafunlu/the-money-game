"use client";

import { MatIcon } from "@/app/components/icons/MatIcon";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CustomersTable } from "./CustomersTable";
import { AddCustomerDialog } from "./dialogs/AddCustomerDialog";

export default function BankPage() {
  const dialogs = useAppSelector((state) => state.dialogs);
  const dispatch = useAppDispatch();

  function openAddCustomerDialog() {
    dispatch(dialogsAction.openAddCustomerDialog());
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <button onClick={openAddCustomerDialog} className="sm common filled">
            <MatIcon icon="add" />
            New Customer
          </button>
        </div>
        <CustomersTable />
      </div>
      {dialogs.addCustomer && <AddCustomerDialog />}
    </>
  );
}
