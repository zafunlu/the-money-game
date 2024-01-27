import { formatMarkdown } from "@/app/utils/formatters";
import styles from "./PreviewAnnouncement.module.scss";

export function PreviewAnnouncement({ title, markdown }: { title?: string; markdown?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl leading-none">{title || "Title Will Display Here"}</h1>
      <div
        className={styles.article}
        dangerouslySetInnerHTML={{
          __html: formatMarkdown(markdown || "Content will display here as you type..."),
        }}
      ></div>
    </div>
  );
}
