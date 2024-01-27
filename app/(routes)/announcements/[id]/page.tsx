"use client";

import { Card } from "@/app/components/card/Card";
import styles from "./Announcement.module.scss";
import { AppConstants } from "@/app/constants/app-constants";
import { formatDate, formatMarkdown } from "@/app/utils/formatters";
import { EditAnnouncementButton } from "./EditAnnouncementButton";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { GET } from "@/app/utils/http-client";

async function getAnnouncement(id: string) {
  const response = await fetch(`${AppConstants.BACKEND_URL}/announcements/${id}`, {
    method: "GET",
  });
  return response.json();
}

export default function AnnouncementPage() {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      const response = await GET(`/announcements/${id}`);

      try {
        if (response.ok) {
          const data = await response.json();
          setAnnouncement(data);

          if (data.description === "") {
            setNotFound(true);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isLoading && !announcement) {
      fetchAnnouncement();
    }
  }, [announcement, id, isLoading]);

  if (!announcement && isLoading) {
    return (
      <main className="container max-w-3xl">
        <Card type="outlined">Loading...</Card>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="container max-w-3xl">
        <Card type="outlined">
          Could not find that announcement. Looks like it does not exist anymore.
        </Card>
      </main>
    );
  }

  return (
    <main className="container max-w-3xl">
      <Card type="outlined">
        <article className="flex flex-col gap-3">
          <div>
            <h1 className="text-2xl">{announcement.title}</h1>
            <time className="text-gray-600 text-sm" dateTime={announcement.created_at}>
              {formatDate(announcement.created_at, { hour: "numeric", minute: "numeric" })}
            </time>
          </div>
          <div
            className={styles.article}
            dangerouslySetInnerHTML={{ __html: formatMarkdown(announcement.description) }}
          ></div>
        </article>
        <EditAnnouncementButton announcementId={announcement.id} />
      </Card>
    </main>
  );
}
