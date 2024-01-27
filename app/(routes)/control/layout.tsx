import { AdminGuard } from "@/app/guards/AdminGuard";

export default function ControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <main className="container max-w-3xl">{children}</main>
    </AdminGuard>
  );
}
