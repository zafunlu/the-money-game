import { AdminGuard } from "@/app/guards/AdminGuard";

export default function ControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <main className="container md:max-w-3xl max-w-full">{children}</main>
    </AdminGuard>
  );
}
