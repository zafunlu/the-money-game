import { Card } from "@/app/components/card/Card";
import Link from "next/link";
import { Metadata } from "next";
import { NonAuthenticatedGuard } from "@/app/guards/NonAuthGuard";
import SignInForm from "./form";

export const metadata: Metadata = {
  title: "The Money Game | Inloggen op je account",
  description: "Heb je al een account bij The Money Game? Log in.",
};

export default function SignInPage() {
  return (
    <NonAuthenticatedGuard>
      <main className="container max-w-2xl">
        <Card type="outlined">
          <h1 className="text-xl">Inloggen bij The Money Game</h1>
          <p>
            Heb je een account nodig? <Link href="signup">Maak er een aan</Link>
            .
          </p>
          <SignInForm />
        </Card>
      </main>
    </NonAuthenticatedGuard>
  );
}
