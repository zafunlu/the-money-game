import Link from "next/link";
import { MatIcon } from "../icons/MatIcon";

export function PremiumButton({ children }: any) {
  return (
    <Link
      href={"dashboard"}
      className="flex gap-1 items-center pill border-indigo-600 border text-indigo-600 no-underline hover:border-indigo-700 hover:text-indigo-700 focus:text-indigo-700 hover:bg-indigo-50 cursor-pointer"
    >
      <MatIcon width={16} height={16} icon="workspace-premium-outline" />
      {children}
    </Link>
  );
}
