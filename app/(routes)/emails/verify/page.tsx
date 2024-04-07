"use client";

import { POST } from "@/app/utils/http-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [statusText, setStatusText] = useState("Processing request...");
  const router = useRouter();

  const verify = useCallback(() => {
    verifyAccount();

    async function verifyAccount(): Promise<void> {
      try {
        const response = await POST("/users/verify", { token });

        if (response.ok) {
          router.push("/dashboard");
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
