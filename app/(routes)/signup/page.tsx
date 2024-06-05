import { Card } from "@/app/components/card/Card";
import Link from "next/link";
import { Metadata } from "next";
import { NonAuthenticatedGuard } from "@/app/guards/NonAuthGuard";
import SignUpForm from "./form";

export const metadata: Metadata = {
  title: "The Money Game | Maak een account aan bij The Money Game",
  description:
    "Wil je beginnen met het gebruik van The Money Game in je leven? Laten we een account voor je maken.",
};

export default function SignUpPage() {
  return (
    <NonAuthenticatedGuard>
      <main className="container max-w-2xl">
        <Card type="outlined">
          <h1 className="text-xl">Maak een account aan bij The Money Game</h1>
          <p>
            Maak gratis een account bij ons aan. Heb je al een account?{" "}
            <Link href="signin">Inloggen</Link>.
          </p>
          <SignUpForm />
          <div className="mt-4 text-center text-xs text-gray-500">
            Door een account aan te maken, ga je akkoord met onze{" "}
            <Link
              target="_blank"
              href="https://raw.githubusercontent.com/bytebury/fun-banking/main/PRIVACY"
            >
              Privacy
            </Link>{" "}
            en{" "}
            <Link
              target="_blank"
              href="https://raw.githubusercontent.com/bytebury/fun-banking/main/TERMS"
            >
              Gebruiksvoorwaarden
            </Link>
            .
          </div>
        </Card>
      </main>
    </NonAuthenticatedGuard>
  );
}
