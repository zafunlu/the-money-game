"use client";

import { formatDate, formatMarkdown, stripHtml } from "@/app/utils/formatters";
import Link from "next/link";

type AnnouncementPreviewProps = {
  announcement: any;
};

export function AnnouncementPreview({ announcement }: AnnouncementPreviewProps) {
  return (
    <section className="flex flex-col gap-2 pb-6 last:pb-0 border-b border-outline last:border-b-0">
      <div>
        <h1 className="text-xl leading-none">{announcement.title}</h1>
        <time dateTime={announcement.created_at} className="text-xs text-gray-600">
          {formatDate(announcement.created_at, {
            month: "long",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
          })}
        </time>
      </div>
      <div
        className="mb-2"
        dangerouslySetInnerHTML={{
          __html: stripHtml(formatMarkdown(announcement.description)).slice(0, 255) + "...",
        }}
      ></div>
      <Link href={`/announcements/${announcement.id}`} className="common filled-tonal w-fit">
        Read more &rarr;
      </Link>
    </section>
  );
}
