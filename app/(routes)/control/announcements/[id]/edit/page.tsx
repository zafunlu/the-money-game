import { AppConstants } from "@/app/constants/app-constants";
import { NewAnnouncementForm } from "../../form";

async function getAnnouncement(id: string) {
  const response = await fetch(`${AppConstants.BACKEND_URL}/announcements/${id}`, {
    method: "GET",
  });
  return response.json();
}

export default async function EditAnnouncementPage({ params }: { params: { id: string } }) {
  const announcement = await getAnnouncement(params.id);
  return (
    <div className="flex flex-col gap-4">
      <h1>Edit Announcement</h1>
      <NewAnnouncementForm title={announcement.title} description={announcement.description} />
    </div>
  );
}
