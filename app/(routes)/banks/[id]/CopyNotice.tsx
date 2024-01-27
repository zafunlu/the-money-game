import { Notice } from "@/app/components/notice/Notice";

export function CopyNotice() {
  return (
    <Notice icon="share-windows">
      <span className="text-sm">
        Click on the button below with the clipboard icon to share the link with your customers. It
        will automatically copy it to your clipboard.
      </span>
    </Notice>
  );
}
