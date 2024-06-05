import { ChangeEvent, useState } from "react";
import {
  fetchAccount,
  selectAccount,
} from "@/lib/features/accounts/accountsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { Dialog } from "@/app/components/dialog/Dialog";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { PATCH } from "@/app/utils/http-client";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { useSnackbar } from "@/app/components/snackbar/snackbar-context";

export function EditAccountNameDialog() {
  const account = useAppSelector(selectAccount);
  const [formData, setFormData] = useState({ name: account?.name || "" });
  const { showSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();

  function close(event: any): void {
    event.preventDefault();
    dispatch(dialogsAction.closeEditAccount());
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function submit(event: any): Promise<void> {
    event.preventDefault();

    if (!account) return;

    try {
      const response = await PATCH(`/accounts/${account?.id}`, { ...formData });
      const data = await response.json();

      if (response.ok) {
        showSnackbar("Accountgegevens succesvol bijgewerkt");
        dispatch(fetchAccount(account.id));
        close(event);
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
        <MatIcon icon="edit-outline" />
        <h1>Rekening Bewerken</h1>
      </header>
      <form className="flex flex-col gap-4" onSubmit={submit}>
        <div className="form-field">
          <label htmlFor="name">Rekeningnaam</label>
          <input
            id="name"
            name="name"
            type="text"
            autoFocus
            className="capitalize"
            placeholder="Rekeningnaam"
            defaultValue={account?.name ?? ""}
            maxLength={15}
            required
            onChange={handleChange}
          />
        </div>
        <footer>
          <button onClick={close} className="common ghost">
            Annuleren
          </button>
          <input type="submit" className="common ghost" value="Opslaan" />
        </footer>
      </form>
    </Dialog>
  );
}
