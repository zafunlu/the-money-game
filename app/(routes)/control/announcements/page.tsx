import { Card } from "@/app/components/card/Card";
import { NewAnnouncementForm } from "./form";

export default function ControlAnnouncementsPage() {
  return (
    <Card type="outlined" className="flex flex-col gap-4">
      <section>
        <h1>Announcements</h1>
        <p className="text-gray-600">
          Announcements are similar to blogs. They are not high priority, but they are useful for
          informating users of updates or general knowledge sharing.
        </p>
      </section>
      <NewAnnouncementForm />
    </Card>
  );
}
