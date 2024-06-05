import React, { useEffect, useState } from "react";
import {
  customerAction,
  selectCustomers,
  selectCustomersStatus,
} from "@/lib/features/customers/customerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { DeleteCustomerDialog } from "./dialogs/DeleteCustomerDialog";
import { MatIcon } from "@/app/components/icons/MatIcon";
import PopoverMenu from "@/app/components/popovers/PopoverMenu";
import { ThunkStatus } from "@/lib/thunk";
import { TransferMoneyDialog } from "./dialogs/TransferMoneyDialog";
import { UpdateCustomerDialog } from "./dialogs/UpdateCustomerDialog";
import { ViewCustomerDialog } from "./dialogs/ViewCustomerDialog";
import { accountsAction } from "@/lib/features/accounts/accountsSlice";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { formatCurrency } from "@/app/utils/formatters";

type CustomerTableProps = {
  filterValue?: string;
};

export function CustomersTable({ filterValue }: CustomerTableProps) {
  const dispatch = useAppDispatch();
  const dialogs = useAppSelector<any>((state) => state.dialogs);
  const customersFromStore = useAppSelector(selectCustomers);
  const selectedCustomers = useAppSelector(
    (state) => state.customers.selectedCustomers
  );
  const [customers, setCustomers] = useState(customersFromStore);
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const customersStatus = useAppSelector(selectCustomersStatus);
  const isMultiSelectMode = useAppSelector(
    (state) => state.customers.isMultiSelectEnabled
  );

  useEffect(() => {
    const updatedCustomersFromStore = customersFromStore.map((customer) => {
      return { ...customer, isSelected: !!selectedCustomers[customer.id] };
    });
    setCustomers(updatedCustomersFromStore);
  }, [customersFromStore, selectedCustomers]);

  useEffect(() => {
    setFilteredCustomers(() => {
      return customers.filter((customer) => {
        const fullName =
          `${customer.first_name} ${customer.last_name} ${customer.pin}`.toLowerCase();
        return fullName.includes(filterValue?.toLowerCase() ?? "");
      });
    });
  }, [filterValue, customers]);

  useEffect(() => {
    if (
      !isMultiSelectMode &&
      customers.some((customer) => customer.isSelected)
    ) {
      const updatedCustomers = customers.map((customer) => ({
        ...customer,
        isSelected: false,
      }));
      setCustomers(updatedCustomers);
    }
  }, [isMultiSelectMode, customers]);

  function openDeleteCustomerDialog(customer: any) {
    dispatch(customerAction.setCustomer(customer));
    dispatch(dialogsAction.openDeleteCustomer());
  }

  function openCreateCustomerDialog(): void {
    dispatch(dialogsAction.openAddCustomerDialog());
  }

  function openEditCustomerDialog(customer: any): void {
    dispatch(customerAction.setCustomer(customer));
    dispatch(dialogsAction.openEditCustomer());
  }

  function openTransferMoneyDialog(customer: any): void {
    dispatch(accountsAction.setCurrentAccount(null));
    dispatch(customerAction.setCustomer(customer));
    dispatch(dialogsAction.openTransferMoney());
  }

  function openViewCustomerDialog(customer: any): void {
    dispatch(customerAction.setCustomer(customer));
    dispatch(dialogsAction.openViewCustomer());
  }

  function handleSelectCustomer(event: any): void {
    const { value: customerId, checked } = event.target;

    if (checked) {
      dispatch(customerAction.addCustomerToSelection(customerId));
      selectCustomer(Number(customerId));
    } else {
      dispatch(customerAction.removeCustomerFromSelection(customerId));
      selectCustomer(Number(customerId), false);
    }
  }

  function selectCustomer(customerId: number, isSelected = true): void {
    const updatedCustomers = customers.map((customer) => {
      return customer.id === customerId
        ? { ...customer, isSelected }
        : customer;
    });
    setCustomers(updatedCustomers);
  }

  if (customersStatus === ThunkStatus.Loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <div className="grid grid-cols-12 rounded-t-2xl border border-b-0 border-outline bg-gray-100 font-bold text-gray-700 py-2 px-3">
          <div className="col-span-5">Leerling</div>
          <div className="col-span-7 text-right pr-11">Balans</div>
        </div>
        {filteredCustomers.length === 0 ? (
          <div className="rounded-b-2xl border border-outline px-3 py-2 text-gray-600">
            You do not have any customers yet. Would you like to{" "}
            <button
              className="inline underline text-primary"
              onClick={openCreateCustomerDialog}
            >
              create one
            </button>
            ?
          </div>
        ) : (
          filteredCustomers.map((customer: any) => {
            return (
              <div
                key={customer.id}
                className="grid grid-cols-12 items-center last:rounded-b-2xl border border-b-0 last:border-b border-outline px-3 py-2 hover:bg-slate-50"
              >
                <div className="col-span-5">
                  <div className="flex font-bold capitalize gap-2">
                    {isMultiSelectMode && (
                      <input
                        id={`checkbox_select_${customer.id}`}
                        onChange={handleSelectCustomer}
                        value={customer.id}
                        type="checkbox"
                        disabled={customer.accounts.length > 1}
                        checked={customer.isSelected ?? false}
                      />
                    )}
                    <label
                      htmlFor={`checkbox_select_${customer.id}`}
                      className={
                        (isMultiSelectMode
                          ? "cursor-pointer "
                          : "cursor-default ") +
                        (customer.accounts.length > 1 && isMultiSelectMode
                          ? "text-gray-400 cursor-not-allowed"
                          : "")
                      }
                    >
                      {customer.first_name} {customer.last_name}
                    </label>
                  </div>
                  <div className="text-gray-600 text-xs">
                    PIN-{customer.pin}
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 col-span-7 text-right font-bold">
                  <div>
                    <span>
                      {formatCurrency(
                        customer.accounts.reduce(
                          (a: any, b: any) => a + b.balance,
                          0
                        )
                      )}
                    </span>
                  </div>
                  <PopoverMenu>
                    <ul>
                      <li>
                        <button
                          onClick={() => openViewCustomerDialog(customer)}
                          className="capitalize"
                        >
                          <MatIcon icon="visibility-outline" />
                          Bekijk {customer.first_name}
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => openTransferMoneyDialog(customer)}
                        >
                          <MatIcon icon="price-change-outline" />
                          Maak geld over
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => openEditCustomerDialog(customer)}
                          className="capitalize"
                        >
                          <MatIcon icon="edit-outline" />
                          Wijzig {customer.first_name}
                        </button>
                      </li>
                      <hr />
                      <li>
                        <button
                          onClick={() => openDeleteCustomerDialog(customer)}
                          className="capitalize"
                        >
                          <MatIcon icon="delete-outline" />
                          Verwijder {customer.first_name}
                        </button>
                      </li>
                    </ul>
                  </PopoverMenu>
                </div>
              </div>
            );
          })
        )}
      </div>
      {dialogs.deleteCustomer && <DeleteCustomerDialog />}
      {dialogs.editCustomer && <UpdateCustomerDialog />}
      {dialogs.transferMoney && <TransferMoneyDialog />}
      {dialogs.viewCustomer && <ViewCustomerDialog />}
    </>
  );
}
