"use client";

import { POST, PUT } from "@/app/utils/http-client";

import { fetchEmployees } from "@/lib/features/banks/banksSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useSnackbar } from "@/app/components/snackbar/snackbar-context";
import { useState } from "react";

type UpdateEmployeesFormProps = { bank: any };

export function UpdateEmployeesForm({ bank }: UpdateEmployeesFormProps) {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState(false);
  const [formData, setFormData] = useState({ email: "" });
  const { showSnackbar } = useSnackbar();

  function handleChange(event: any) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function clearForm() {
    setFormData({ email: "" });
  }

  async function addEmployee(event: any) {
    event.preventDefault();
    setIsDisabled(true);

    try {
      const payload = { bank_id: bank.id, email: formData.email };
      const response = await PUT(`/employees`, payload);

      if (response.ok) {
        dispatch(fetchEmployees(bank.id));
        showSnackbar("You have added an employee successfully");
        clearForm();
      } else {
        const { message } = await response.json();
        showSnackbar(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDisabled(false);
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={addEmployee}>
      <div className="form-field">
        <label htmlFor="email">E-mailadres medewerker</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          placeholder="E-mailadres medewerker"
          autoComplete="off"
          required
          value={formData.email}
        />
      </div>
      <div>
        <input
          className="common filled"
          type="submit"
          value="Medewerker toevoegen"
          disabled={isDisabled}
        />
      </div>
    </form>
  );
}
