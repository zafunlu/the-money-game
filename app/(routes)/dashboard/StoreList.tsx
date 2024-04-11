"use client";

import { selectCurrentUser } from "@/lib/features/users/usersSlice";
import { useAppSelector } from "@/lib/hooks";
import { SubscriptionTier } from "@/lib/models/User";
import Link from "next/link";

export function StoreList() {
  const user = useAppSelector(selectCurrentUser);

  if (user.subscription_tier < SubscriptionTier.Premium) {
    return (
      <div className="flex flex-col gap-2 text-gray-600 text-sm">
        This feature is only allowed for premium users.
        <div>
          <Link className="premium-link" href={"dashboard"}>
            Upgrade to Premium Today
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="text-gray-600 text-sm">
      It seems like you don&apos;t have any stores yet. Do you want to{" "}
      <button className="inline text-primary underline">create one</button>?
    </div>
  );
}
