import { AuthenticatedGuard } from "@/app/guards/AuthGuard";

type SettingsLayoutProps = { children: React.ReactNode };

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <AuthenticatedGuard>
      <main className="container max-w-4xl flex flex-col gap-4">{children}</main>
    </AuthenticatedGuard>
  );
}
