"use client";

import { Card } from "@/app/components/card/Card";
import ChangeEmailForm from "./ChangeEmailForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/lib/features/users/usersSlice";
import { MatIcon } from "@/app/components/icons/MatIcon";

export default function SecuritySettingsPage() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      <Card type="outlined">
        <section className="flex flex-col gap-2">
          <h1>Security Information</h1>
          <div>
            Your e-mail:{" "}
            <div className="inline-flex gap-1 items-center">
              <strong>{user?.email.toLowerCase()}</strong>
              {user.verified && (
                <MatIcon className="text-blue-500" width={16} height={16} icon="verified" />
              )}
            </div>
          </div>
        </section>
      </Card>
      <Card type="outlined">
        <section className="flex flex-col gap-2">
          <div>
            <h1>Change Your E-mail</h1>
            <p className="text-gray-500 text-sm">
              After you submit you will recieve an e-mail for verification. You{" "}
              <strong>will need to verify</strong> your new e-mail to continue working with Fun
              Banking. If you do not recieve an e-mail, check your spam, or check your e-mail
              providers policy on recieving external e-mails.
            </p>
          </div>
          <ChangeEmailForm />
        </section>
      </Card>
      <Card type="outlined">
        <section className="flex flex-col gap-2">
          <div>
            <h1>Password Reset</h1>
            <p className="text-gray-500 text-sm">
              Clicking the button below will send you an e-mail with instructions on how to reset
              your password. Your e-mail must be verified before you can do this.
            </p>
          </div>
          <ForgotPasswordForm />
        </section>
      </Card>
    </>
  );
}
