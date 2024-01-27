"use client";

import { Card } from "@/app/components/card/Card";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { useSnackbar } from "@/app/components/snackbar/snackbar-context";
import { formatDate } from "@/app/utils/formatters";
import { GET } from "@/app/utils/http-client";
import { UserRole } from "@/lib/models/User";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { username } = useParams();
  const [user, setUser] = useState<any>(null);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await GET(`/users/${username}`);

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          const { message } = await response.json();
          showSnackbar(message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (!user) {
      fetchUser();
    }
  }, [showSnackbar, user, username]);

  if (!user) {
    return (
      <main className="container max-w-xl">
        <Card type="outlined">Loading...</Card>
      </main>
    );
  }

  return (
    <main className="container max-w-xl">
      <Card type="outlined">
        <header className="relative flex justify-center h-28 bg-tonal rounded-[20px]">
          <img
            className="absolute -bottom-8 w-32 h-32 rounded-full border-[8px] border-white bg-white"
            src={user.avatar}
            alt="profile image"
            width={128}
            height={128}
          />
        </header>
        <div className="flex flex-col gap-4 mt-8">
          <section className="text-center">
            <h1 className="text-2xl capitalize">
              {user.first_name} {user.last_name}
            </h1>
            <div className="text-sm text-gray-500 mb-2">@{user.username}</div>
            <div className="flex gap-2 justify-center">
              {user.role === UserRole.Admin && (
                <div className="inline-flex gap-1 items-center rounded-[20px] px-3 py-1 bg-pink-600 text-white text-sm">
                  <MatIcon className="w-5 h-5" icon="admin-panel-settings-outline" />
                  Admin
                </div>
              )}
              <div className="inline-flex gap-1 items-center rounded-[20px] px-3 py-1 bg-gray-200 text-sm">
                <MatIcon className="w-5 h-5" icon="calendar-month-outline" />
                Joined {formatDate(user.created_at)}
              </div>
            </div>
          </section>
          <section>
            <h1>About Me</h1>
            {user.about}
            {!user.about && (
              <div className="text-gray-500">
                Looks like <span className="capitalize">{user.first_name}</span> has not filled this
                section out yet.
              </div>
            )}
          </section>
        </div>
      </Card>
    </main>
  );
}
