"use client";

import { PATCH } from "@/app/utils/http-client";
import { fetchCurrentUser } from "@/lib/features/users/usersSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useSnackbar } from "@/app/components/snackbar/snackbar-context";
import { useState } from "react";

export default function ChangeEmailForm() {
  const initialFormData = { email: "" };
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useAppDispatch();

  const { showSnackbar } = useSnackbar();

  function handleChange(event: any): void {
    const { name, value } = event.target;
    setFormData({ ...formData, [name as keyof typeof formData]: value });
  }

  async function submitChangeEmail(event: any): Promise<void> {
    event.preventDefault();

    setDisableSubmit(true);

    try {
      const response = await PATCH("/users/email", formData);

      if (response.ok) {
        setFormData(initialFormData);
        dispatch(fetchCurrentUser());
        showSnackbar(
          "Successfully sent a verification e-mail to that provided e-mail"
        );
      } else {
        const { message } = await response.json();
        showSnackbar(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisableSubmit(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={submitChangeEmail}>
      <div className="form-field">
        <label htmlFor="change-email-email">Nieuwe e-mailadres</label>
        <input
          id="change-email-email"
          name="email"
          type="email"
          inputMode="email"
          placeholder="Nieuwe e-mailadres"
          onChange={handleChange}
          value={formData.email}
          required
        />
      </div>
      <div className="flex gap-2">
        <input
          value="Wijzig e-mailadres"
          className="common filled"
          type="submit"
          disabled={!formData.email || disableSubmit}
        />
        <input value="Annuleren" className="common ghost" type="reset" />
      </div>
    </form>
  );
}
