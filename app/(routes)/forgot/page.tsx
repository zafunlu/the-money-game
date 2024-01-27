import { Metadata } from "next";
import ForgotPasswordForm from "./form";
import { Card } from "@/app/components/card/Card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fun Banking | Forgot Password",
  description: "Start the process of resetting your Fun Banking password if you forgot it.",
};
export default function ForgotPasswordPage() {
  return (
    <main className="container max-w-2xl">
      <Card type="outlined">
        <h1 className="text-xl">Reset Your Password</h1>
        <p>
          Know your password already? <Link href="/signin">Sign in</Link>.
        </p>
        <ForgotPasswordForm />
      </Card>
    </main>
  );
}
