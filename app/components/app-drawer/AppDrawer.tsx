"use client";

import { useEffect, useRef } from "react";
import "./AppDrawer.scss";

type AppDrawerParams = {
  children: React.ReactNode;
  isOpen: boolean;
  closeDrawer: () => void;
};

export function AppDrawer({ children, isOpen, closeDrawer }: AppDrawerParams) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (drawerRef?.current) {
      setTimeout(() => {
        const details = drawerRef.current?.querySelectorAll("details");

        details?.forEach((detailsEl) => {
          const hasActiveLink = !!detailsEl.querySelector("a.active");

          if (hasActiveLink) {
            detailsEl.setAttribute("open", "open");
          }
        });
      }, 250);
    }
  }, [drawerRef]);

  function handleClick(event: any): void {
    if (event.target === event.currentTarget) {
      closeDrawer();
    }
  }

  return (
    <div className="app-drawer-backdrop" onClick={handleClick}>
      <nav className={`app-drawer ${isOpen && "opened"}`}>
        <div ref={drawerRef}>{children}</div>
      </nav>
    </div>
  );
}
