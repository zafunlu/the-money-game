"use client";

import { useSnackbar } from "@/app/components/snackbar/snackbar-context";
import { ErrorMessages } from "@/app/constants/error-messages";
import { POST } from "@/app/utils/http-client";
import { ChangeEvent, useRef, useState } from "react";

export default function ForgotPasswordForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const { showSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({ email: "" });
  const [isDisabled, setIsDisabled] = useState(false);
  const formNameLabelMap = { email: "E-mail" };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setIsDisabled(false);
  }

  function isInvalid(): boolean {
    return Object.values(formData).some((value) => !value);
  }

  async function sendPasswordResetEmail(event: any): Promise<void> {
    event.preventDefault();
    setIsDisabled(true);
    formRef.current?.reset();

    try {
      const response = await POST(`/passwords/forgot`, formData);

      if (!response.ok) {
        const json = await response.json();
        showSnackbar(json.message);
        return;
      }

      showSnackbar(
        "We have sent an e-mail to that address if it exists in our system. Please check your Junk folder if you do not see an e-mail in the next 5 minutes.",
        "Dismiss",
        15_000
      );
    } catch (error) {
      console.error(error);
      showSnackbar(ErrorMessages.GENERIC, "Dismiss", 0);
    }
  }

  return (
    <form ref={formRef} onSubmit={sendPasswordResetEmail} className="flex flex-col gap-2">
      <div className="flex">
        <div className="form-field">
          <label htmlFor="email">{formNameLabelMap.email}</label>
          <input
            id="email"
            type="text"
            name="email"
            inputMode="email"
            placeholder={formNameLabelMap.email}
            onChange={handleChange}
            autoFocus
            autoComplete="username"
          />
        </div>
      </div>
      <footer className="justify-start my-2">
        <input
          type="submit"
          value="Send Password Reset E-mail"
          className="common filled"
          disabled={isInvalid() || isDisabled}
        />
        <input type="reset" value="Cancel" className="common ghost" />
      </footer>
    </form>
  );
}
