"use client";

import { useSnackbar } from "@/app/components/snackbar/snackbar-context";
import { POST } from "@/app/utils/http-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [statusText, setStatusText] = useState("Processing request...");
  const router = useRouter();
  const { showSnackbar } = useSnackbar();

  const verify = useCallback(() => {
    verifyAccount();

    async function verifyAccount(): Promise<void> {
      try {
        const response = await POST("/users/verify", { token });

        if (response.ok) {
          router.push("/signin");
          showSnackbar(
            "Congratulations! You are now verified, you may now log in if you are not already"
          );
        } else {
          const { message } = await response.json();
          setStatusText(message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }, [router, token]);

  useEffect(() => {
    if (token) {
      verify();
    }
  }, [token, verify]);

  return <div className="container">{statusText}</div>;
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <Page></Page>
    </Suspense>
  );
}
