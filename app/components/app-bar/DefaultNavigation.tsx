import Link from "next/link";
import { usePathname } from "next/navigation";
import { MatIcon } from "../icons/MatIcon";

type DefaultNavigationProps = { closeDrawer: () => void };

export function DefaultNavigation({ closeDrawer }: DefaultNavigationProps) {
  const pathname = usePathname();

  return (
    <ul>
      <li>
        <Link href="/" className={`${pathname === "/" ? "active" : ""}`} onClick={closeDrawer}>
          <div>
            <MatIcon icon="home-outline" />
            Homepage
          </div>
        </Link>
      </li>
      <li>
        <Link
          href="/signin"
          className={`${pathname === "/signin" ? "active" : ""}`}
          onClick={closeDrawer}
        >
          <div>
            <MatIcon icon="person-add-outline" />
            Sign in
          </div>
        </Link>
      </li>
      <li>
        <Link
          href="/signup"
          className={`${pathname === "/signup" ? "active" : ""}`}
          onClick={closeDrawer}
        >
          <div>
            <MatIcon icon="join-outline" />
            Sign up
          </div>
        </Link>
      </li>
    </ul>
  );
}
