import { Card } from "@/app/components/card/Card";
import ForgotPasswordForm from "./form";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Money Game | Wachtwoord vergeten",
  description:
    "Begin het proces om je wachtwoord voor The Money Game te resetten als je het bent vergeten.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="container max-w-2xl">
      <Card type="outlined">
        <h1 className="text-xl">Reset je wachtwoord</h1>
        <p>
          Weet je je wachtwoord al? <Link href="/signin">Inloggen</Link>.
        </p>
        <ForgotPasswordForm />
      </Card>
    </main>
  );
}
