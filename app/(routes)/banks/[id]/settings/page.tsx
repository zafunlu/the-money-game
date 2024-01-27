"use client";

import { useAppSelector } from "@/lib/hooks";
import { EmployeeList } from "../EmployeeList";
import { DangerZone } from "./DangerZone";
import { UpdateBankForm } from "./UpdateBankForm";
import { UpdateEmployeesForm } from "./UpdateEmployeesForm";
import { selectCurrentBank } from "@/lib/features/banks/banksSlice";

export default function BankSettingsPage() {
  const bank = useAppSelector(selectCurrentBank);

  return (
    <div className="flex flex-col gap-4">
      <UpdateBankForm bank={bank} />
      <hr />
      <section className="flex flex-col gap-4">
        <div>
          <h1>Add Employees</h1>
          <p className="text-sm text-gray-700">
            You can add employees to help you with managing your bank. They&apos;ll have all the
            access that you do, except they will not be able to update or delete bank settings.
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
