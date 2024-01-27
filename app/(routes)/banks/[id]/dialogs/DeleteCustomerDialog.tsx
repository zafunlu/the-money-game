import { Dialog } from "@/app/components/dialog/Dialog";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { useSnackbar } from "@/app/components/snackbar/snackbar-context";
import { DELETE } from "@/app/utils/http-client";
import { selectCurrentBank } from "@/lib/features/banks/banksSlice";
import { fetchCustomers, selectCustomer } from "@/lib/features/customers/customerSlice";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";

export function DeleteCustomerDialog() {
  const dispatch = useAppDispatch();
  const bank = useAppSelector(selectCurrentBank);
  const customer = useAppSelector(selectCustomer);
  const { showSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);

  function closeDialog() {
    dispatch(dialogsAction.closeDeleteCustomer());
  }

  async function deleteCustomer(event: any) {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await DELETE(`/customers/${customer.id}`);

      if (response.ok) {
        closeDialog();
        showSnackbar(`Successfully removed ${customer.first_name} from the bank`);
        dispatch(fetchCustomers(bank.id));
      } else {
        // snackbar
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <header>
        <MatIcon icon="delete-outline" />
        <h1 className="capitalize">Delete {customer?.first_name}?</h1>
      </header>
      <form className="flex flex-col gap-4" onSubmit={deleteCustomer}>
        <main className="flex flex-col gap-3">
          <p>
            Deleting a customer is a permanent action. You will lose all of the data associated to
            this customer.
          </p>
          <p>Are you sure you want to delete them?</p>
        </main>
        <footer>
          <button onClick={closeDialog} className="common ghost">
            Cancel
          </button>
          <input
            className="capitalize common ghost"
            type="submit"
            value={`Delete ${customer?.first_name}`}
            disabled={isLoading}
          />
        </footer>
      </form>
    </Dialog>
  );
}
