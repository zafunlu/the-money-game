"use client";

import { formatDate } from "@/app/utils/formatters";
import { GET } from "@/app/utils/http-client";
import Link from "next/link";
import styles from "./AnnouncementList.module.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { announcementsAction } from "@/lib/features/announcements/announcementsSlice";

export function AnnouncementList() {
  const dispatch = useAppDispatch();
  const announcements = useAppSelector((state) => state.announcements as any);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await GET(`/announcements?page=1&limit=5`);

        if (response.ok) {
          const { items: announcementsData } = await response.json();
          dispatch(announcementsAction.setAnnouncements(announcementsData));
        } else {
          // TODO(Marcello): Handle error
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!announcements) {
      fetchAnnouncements();
    }
  }, [announcements, dispatch]);

  useEffect(() => {
    if (announcements) {
      setIsLoading(false);
    }
  }, [announcements]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="shimmer w-full h-10 bg-gray-100 rounded-full"></div>
        <div className="shimmer w-full h-10 bg-gray-100 rounded-full"></div>
        <div className="shimmer w-full h-10 bg-gray-100 rounded-full"></div>
        <div className="shimmer w-full h-10 bg-gray-100 rounded-full"></div>
        <div className="shimmer w-full h-10 bg-gray-100 rounded-full"></div>
      </div>
    );
  }

  return (
    <ol
      className={`${styles.announcements} relative flex flex-col gap-0 border-l border-gray-300 pl-4`}
    >
      {announcements?.map((announcement: any) => {
        return (
          <li key={announcement.id} className="text-sm py-1">
            <div className="absolute -left-1.5 bg-gray-300 rounded-full w-[11px] h-[11px] border-2 mt-1 border-white"></div>
            <time className="text-xs text-gray-500">
              {formatDate(announcement.created_at, { month: "short" })}
            </time>
            <div className="whitespace-nowrap text-ellipsis overflow-hidden">
              <Link href={`/announcements/${announcement.id}`}>{announcement.title}</Link>
            </div>
          </li>
        );
      })}
      <li>
        <Link className="text-xs" href={"/announcements"}>
          View More Announcements
        </Link>
      </li>
    </ol>
  );
}
