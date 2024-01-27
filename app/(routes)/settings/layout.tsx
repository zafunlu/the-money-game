import { Card } from "@/app/components/card/Card";
import { AuthenticatedGuard } from "@/app/guards/AuthGuard";

type SettingsLayoutProps = { children: React.ReactNode };

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <AuthenticatedGuard>
      <main className="container max-w-4xl">
        <Card type="outlined">
          <section className="flex flex-col gap-2">{children}</section>
        </Card>
      </main>
    </AuthenticatedGuard>
  );
}
