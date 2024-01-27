"use client";

import { ProfilePreview } from "@/app/components/profile-preview/ProfilePreview";
import {
  selectCurrentBank,
  selectCurrentBankStatus,
  selectEmployees,
  selectEmployeesStatus,
} from "@/lib/features/banks/banksSlice";
import { useAppSelector } from "@/lib/hooks";
import { ThunkStatus } from "@/lib/thunk";

export function EmployeeList() {
  const bank = useAppSelector(selectCurrentBank);
  const bankStatus = useAppSelector(selectCurrentBankStatus);
  const employees = useAppSelector(selectEmployees);
  const employeesStatus = useAppSelector(selectEmployeesStatus);

  if (bankStatus === ThunkStatus.Loading || bankStatus === ThunkStatus.Idle) {
    <div>Loading...</div>;
  }

  return (
    <ul className="flex gap-2 flex-wrap">
      <li>
        <ProfilePreview className="w-10 h-10" user={bank.owner} />
      </li>
      {employeesStatus === ThunkStatus.Loading || employeesStatus === ThunkStatus.Idle ? (
        <></>
      ) : (
        employees.map(({ user }: any) => (
          <li key={user.id}>
            <ProfilePreview className="w-10 h-10" user={user} />
          </li>
        ))
      )}
    </ul>
  );
}
