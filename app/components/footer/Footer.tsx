import Link from "next/link";
import { ByteburyIcon } from "../icons/ByteburyIcon";
import "./Footer.scss";

export function Footer() {
  return (
    <footer className="primary">
      <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between container">
        <div className="text-center md:text-left">
          <div className="text-2xl font-bold mb-2">Let&apos;s start working together</div>
          <div className="flex items-center gap-1 text-xs justify-center md:justify-start">
            Created by
            <Link href="https://bytebury.com" className="bytebury-link">
              <ByteburyIcon className="w-4 h-4" />
              bytebury
            </Link>
          </div>
          <div className="text-xs">&copy; Fun Banking. All Rights Reserved.</div>
        </div>
        <div className="legal">
          <ul>
            <li>
              <Link href="mailto:bytebury@gmail.com">Contact Us</Link>
            </li>
            <li>
              <Link href="https://raw.githubusercontent.com/bytebury/fun-banking/main/PRIVACY">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="https://raw.githubusercontent.com/bytebury/fun-banking/main/TERMS">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
