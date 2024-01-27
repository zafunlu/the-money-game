import { Metadata } from "next";
import SignUpForm from "./form";
import { Card } from "@/app/components/card/Card";
import Link from "next/link";
import { NonAuthenticatedGuard } from "@/app/guards/NonAuthGuard";

export const metadata: Metadata = {
  title: "Fun Banking | Create an Account with Fun Banking",
  description: "Want to start using Fun Banking in your life? Let's make you an account.",
};
export default function SignUpPage() {
  return (
    <NonAuthenticatedGuard>
      <main className="container max-w-2xl">
        <Card type="outlined">
          <h1 className="text-xl">Create a Fun Banking Account</h1>
          <p>
            Create an account with us for free. Already have an account?{" "}
            <Link href="signin">Sign in</Link>.
          </p>
          <SignUpForm />
          <div className="mt-4 text-center text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <Link
              target="_blank"
              href="https://raw.githubusercontent.com/bytebury/fun-banking/main/PRIVACY"
            >
              Privacy
            </Link>{" "}
            and{" "}
            <Link
              target="_blank"
              href="https://raw.githubusercontent.com/bytebury/fun-banking/main/TERMS"
            >
              Terms of Service
            </Link>
            .
          </div>
        </Card>
      </main>
    </NonAuthenticatedGuard>
  );
}
