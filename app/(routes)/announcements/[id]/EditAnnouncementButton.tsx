"use client";

import { selectCurrentUser } from "@/lib/features/users/usersSlice";
import { useAppSelector } from "@/lib/hooks";
import { UserRole } from "@/lib/models/User";
import Link from "next/link";

export function EditAnnouncementButton({ announcementId }: { announcementId: string | number }) {
  const user = useAppSelector(selectCurrentUser);

  return (
    <>
      {user?.role === UserRole.Admin && (
        <div className="flex mt-5">
          <Link
            className="common sm outlined"
            href={`/control/announcements/${announcementId}/edit`}
          >
            Edit Announcement
          </Link>
        </div>
      )}
    </>
  );
}
