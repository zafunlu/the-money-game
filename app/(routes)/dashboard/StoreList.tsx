"use client";

import Link from "next/link";
import { SubscriptionTier } from "@/lib/models/User";
import { selectCurrentUser } from "@/lib/features/users/usersSlice";
import { useAppSelector } from "@/lib/hooks";

export function StoreList() {
  const user = useAppSelector(selectCurrentUser);

  if (user.subscription_tier < SubscriptionTier.Premium) {
    return (
      <div className="flex flex-col gap-2 text-gray-600 text-sm">
        Deze functie is alleen beschikbaar voor premium gebruikers.
        <div>
          <Link className="premium-link" href={"dashboard"}>
            Upgrade vandaag nog naar Premium
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-600 text-sm">
      Het lijkt erop dat je nog geen winkels hebt. Wil je er{" "}
      <button className="inline text-primary underline">een maken</button>?
    </div>
  );
}
