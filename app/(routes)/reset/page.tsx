import { Card } from "@/app/components/card/Card";
import Link from "next/link";
import { Metadata } from "next";
import ResetPasswordForm from "./form";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "The Money Game | Wachtwoord resetten",
  description: "Reset je wachtwoord voor je account bij The Money Game",
};

export default function ResetPasswordPage() {
  return (
    <main className="container max-w-2xl">
      <Card type="outlined">
        <h1 className="text-xl">Reset je wachtwoord</h1>
        <p>
          Weet je je wachtwoord al? <Link href="/signin">Inloggen</Link>.
        </p>
        <Suspense>
          <ResetPasswordForm />
        </Suspense>
      </Card>
    </main>
  );
}
