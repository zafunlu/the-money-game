import { Notice } from "@/app/components/notice/Notice";

export function CopyNotice() {
  return (
    <Notice icon="share-windows">
      <span className="text-sm">
        Klik op de link met het icoon hieronder om de link met je leerlingen te
        delen. De link wordt automatisch naar je klembord gekopieerd.
      </span>
    </Notice>
  );
}
