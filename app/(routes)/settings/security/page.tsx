"use client";

import { Card } from "@/app/components/card/Card";
import ChangeEmailForm from "./ChangeEmailForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { selectCurrentUser } from "@/lib/features/users/usersSlice";
import { useAppSelector } from "@/lib/hooks";

export default function SecuritySettingsPage() {
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      <Card type="outlined">
        <section className="flex flex-col gap-2">
          <h1>Beveiligingsinformatie</h1>
          <div>
            Je e-mail:{" "}
            <div className="inline-flex gap-1 items-center">
              <strong>{user?.email.toLowerCase()}</strong>
              {user.verified && (
                <MatIcon
                  className="text-blue-500"
                  width={16}
                  height={16}
                  icon="verified"
                />
              )}
            </div>
          </div>
        </section>
      </Card>
      <Card type="outlined">
        <section className="flex flex-col gap-2">
          <div>
            <h1>Wijzig je e-mail</h1>
            <p className="text-gray-500 text-sm">
              Nadat je dit indient, ontvang je een e-mail voor verificatie. Je{" "}
              <strong>moet je nieuwe e-mail verifiëren</strong> om verder te
              gaan met The Money Game. Als je geen e-mail ontvangt, controleer
              dan je spam of controleer het beleid van je e-mailprovider over
              het ontvangen van externe e-mails.
            </p>
          </div>
          <ChangeEmailForm />
        </section>
      </Card>
      <Card type="outlined">
        <section className="flex flex-col gap-2">
          <div>
            <h1>Wachtwoord resetten</h1>
            <p className="text-gray-500 text-sm">
              Klikken op de onderstaande knop stuurt je een e-mail met
              instructies om je wachtwoord te resetten. Je e-mail moet
              geverifieerd zijn voordat je dit kunt doen.
            </p>
          </div>
          <ForgotPasswordForm />
        </section>
      </Card>
    </>
  );
}
