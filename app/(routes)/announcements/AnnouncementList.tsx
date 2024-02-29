"use client";

import { AppConstants } from "@/app/constants/app-constants";
import { useEffect, useState } from "react";
import { AnnouncementPreview } from "./AnnouncementPreview";

export function AnnouncementList() {
  const [isLoading, setIsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const response = await fetch(`${AppConstants.BACKEND_URL}/announcements?itemsPerPage=20`, {
        method: "GET",
      });
      const announcementInfo = await response.json();
      setAnnouncements(announcementInfo.items);
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchAnnouncements();
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      {announcements.map((announcement: any) => {
        return <AnnouncementPreview key={announcement.id} announcement={announcement} />;
      })}
    </>
  );
}
