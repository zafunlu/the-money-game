"use client";

import { ErrorMessages } from "@/app/constants/error-messages";
import { POST } from "@/app/utils/http-client";
import { selectCurrentUser } from "@/lib/features/users/usersSlice";
import { useAppSelector } from "@/lib/hooks";
import { useSnackbar } from "@/app/components/snackbar/snackbar-context";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const { showSnackbar } = useSnackbar();

  async function sendPasswordResetInstructions(event: any): Promise<void> {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await POST(`/passwords/forgot`, { email: user.email });

      if (!response.ok) {
        const json = await response.json();
        showSnackbar(json.message);
        return;
      }

      showSnackbar(
        "We hebben een e-mail naar dat adres gestuurd als het in ons systeem bestaat. Controleer je spamfolder als je binnen de volgende 5 minuten geen e-mail ziet.",
        "Sluiten",
        15_000
      );
    } catch (error) {
      console.error(error);
      showSnackbar(ErrorMessages.GENERIC, "Dismiss", 0);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        className="common filled"
        disabled={!user?.verified || loading}
        onClick={sendPasswordResetInstructions}
      >
        Stuur instructies om wachtwoord te resetten
      </button>
    </div>
  );
}
