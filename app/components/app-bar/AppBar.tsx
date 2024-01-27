"use client";

import { useEffect, useState } from "react";
import { MatIcon } from "../icons/MatIcon";
import "./AppBar.scss";
import { ByteburyIcon } from "../icons/ByteburyIcon";
import Link from "next/link";
import { AppDrawer } from "../app-drawer/AppDrawer";
import { DefaultNavigation } from "./DefaultNavigation";
import { SignedInNavigation } from "./SignedInNavigation";
import { useAppSelector } from "@/lib/hooks";
import { selectPendingApprovals } from "@/lib/features/pending-transactions/pendingTransactionsSlice";
import { selectCurrentUser } from "@/lib/features/users/usersSlice";
import { GoBackButton } from "../buttons/GoBackButton";
import { useCustomerAuth } from "@/app/guards/CustomerAuthContext";
import { CustomerNavigation } from "./CustomerNavigation";

export function AppBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);
  const shouldDisplayGoBack = useAppSelector((state) => state.appBar.shouldDisplayGoBack);
  const currentUser = useAppSelector(selectCurrentUser);
  const { isLoggedIn: isLoggedInAsCustomer } = useCustomerAuth();
  const pendingTransactions = useAppSelector(selectPendingApprovals);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    // Add the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function toggleDrawer(): void {
    setIsAppDrawerOpen((value) => !value);
  }

  function closeDrawer(): void {
    setIsAppDrawerOpen(false);
  }

  return (
    <header className={scrolled ? "top-bar-container scrolled" : "top-bar-container"}>
      <div className="leading-icon">
        {shouldDisplayGoBack ? (
          <GoBackButton>
            <MatIcon icon="arrow-back" />
          </GoBackButton>
        ) : (
          <button
            className="icon relative group"
            onClick={toggleDrawer}
            aria-label="Navigation Menu Button"
          >
            <MatIcon icon="menu" />
            {pendingTransactions.length > 0 && (
              <span className="absolute top-1.5 left-1.5 flex h-4 w-4">
                <span className="relative inline-flex rounded-full h-4 w-4 border-[3px] border-neutral group-hover:border-neutral-hover group-active:border-neutral-pressed bg-primary transition-colors duration-300 ease-in-out"></span>
              </span>
            )}
          </button>
        )}

        <AppDrawer isOpen={isAppDrawerOpen} closeDrawer={closeDrawer}>
          <h1>Navigation</h1>
          {!!currentUser ? (
            <SignedInNavigation closeDrawer={closeDrawer} />
          ) : isLoggedInAsCustomer ? (
            <CustomerNavigation closeDrawer={closeDrawer} />
          ) : (
            <DefaultNavigation closeDrawer={closeDrawer} />
          )}
        </AppDrawer>
      </div>
      <h1 className="headline">
        <Link href={!!currentUser ? "/dashboard" : "/"}>
          <ByteburyIcon className="w-5 h-5" />
          Fun Banking
        </Link>
      </h1>
      <div className="trailing-icon"></div>
    </header>
  );
}
