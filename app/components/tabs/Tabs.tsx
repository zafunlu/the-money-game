import styles from "./Tabs.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface TabsInfo {
  link: string;
  displayText: string;
}

type TabsProps = {
  children: React.ReactNode;
  tabs: TabsInfo[];
};

export function Tabs({ children, tabs }: TabsProps) {
  const currentPathname = usePathname();

  function isActive(pathname: string) {
    return currentPathname === pathname;
  }

  return (
    <div className={styles.tabs}>
      <div className={styles.tabsHeader}>
        <ul>
          {tabs.map((tab, index) => {
            return (
              <li key={index} className={`${isActive(tab.link) ? styles.active : ""}`}>
                <Link href={tab.link}>
                  <span>{tab.displayText}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="pt-4">{children}</div>
    </div>
  );
}
