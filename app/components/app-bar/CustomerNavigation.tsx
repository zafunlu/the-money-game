import Link from "next/link";
import { usePathname } from "next/navigation";
import { MatIcon } from "../icons/MatIcon";
import { useCustomerAuth } from "@/app/guards/CustomerAuthContext";

type CustomerNavigationProps = { closeDrawer: () => void };

export function CustomerNavigation({ closeDrawer }: CustomerNavigationProps) {
  const pathname = usePathname();
  const { signout } = useCustomerAuth();

  return (
    <ul>
      <li>
        <Link
          href="/customer"
          className={`${pathname === "/customer" ? "active" : ""}`}
          onClick={closeDrawer}
        >
          <div>
            <MatIcon icon="home-outline" />
            Homepage
          </div>
        </Link>
      </li>
      <li>
        <button
          onClick={() => {
            closeDrawer();
            signout();
          }}
        >
          <div>
            <MatIcon icon="logout" />
            Logout
          </div>
        </button>
      </li>
    </ul>
  );
}
