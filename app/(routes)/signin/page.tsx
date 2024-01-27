import { Metadata } from "next";
import SignInForm from "./form";
import { Card } from "@/app/components/card/Card";
import Link from "next/link";
import { NonAuthenticatedGuard } from "@/app/guards/NonAuthGuard";

export const metadata: Metadata = {
  title: "Fun Banking | Login to your Account",
  description: "Have an existing account with Fun Banking? Let's sign in.",
};
export default function SignInPage() {
  return (
    <NonAuthenticatedGuard>
      <main className="container max-w-2xl">
        <Card type="outlined">
          <h1 className="text-xl">Sign in to Fun Banking</h1>
          <p>
            Need an account? <Link href="signup">Create one</Link>.
          </p>
          <SignInForm />
        </Card>
      </main>
    </NonAuthenticatedGuard>
  );
}
