import { Notice } from "@/app/components/notice/Notice";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container max-w-3xl">
      <div className="mb-4">
        <Notice icon="warning-outline">
          <span className="text-sm">
            The Money Game is een online bank simulator voor educatieve
            doeleinden. Voer geen echte bankgegevens in.
          </span>
        </Notice>
      </div>
      {children}
    </main>
  );
}
