"use client";

import { DangerZone } from "./DangerZone";
import { EmployeeList } from "../EmployeeList";
import { UpdateBankForm } from "./UpdateBankForm";
import { UpdateEmployeesForm } from "./UpdateEmployeesForm";
import { selectCurrentBank } from "@/lib/features/banks/banksSlice";
import { useAppSelector } from "@/lib/hooks";

export default function BankSettingsPage() {
  const bank = useAppSelector(selectCurrentBank);

  return (
    <div className="flex flex-col gap-4">
      <UpdateBankForm bank={bank} />
      <hr />
      <section className="flex flex-col gap-4">
        <div>
          <h1>Medewerkers toevoegen</h1>
          <p className="text-sm text-gray-700">
            Je kunt medewerkers toevoegen om je te helpen met het beheren van je
            bank. Ze zullen dezelfde toegang hebben als jij, behalve dat ze geen
            bankinstellingen kunnen bijwerken of verwijderen.
          </p>
        </div>
        <EmployeeList />
        <UpdateEmployeesForm bank={bank} />
      </section>
      <hr />
      <DangerZone bank={bank} />
    </div>
  );
}
