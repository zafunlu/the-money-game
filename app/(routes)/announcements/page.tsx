import { Card } from "@/app/components/card/Card";
import { Metadata } from "next";
import { AnnouncementList } from "./AnnouncementList";

export const metadata: Metadata = {
  title: "Fun Banking | Announcements from the Team",
  description: "Here are some recent announcements and updates from the Fun Banking team.",
};

export default async function AnnouncementsPage() {
  return (
    <main className="container max-w-3xl">
      <Card className="flex flex-col gap-6" type="outlined">
        <section>
          <h1 className="text-2xl">Recent Announcements</h1>
          <p>Stay in the loop! Here are some of the latest updates from the Fun Banking team</p>
        </section>
        <AnnouncementList />
      </Card>
    </main>
  );
}
