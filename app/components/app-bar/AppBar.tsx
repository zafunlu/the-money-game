"use client";

import "./AppBar.scss";

import { useEffect, useState } from "react";

import { AppDrawer } from "../app-drawer/AppDrawer";
import { ByteburyIcon } from "../icons/ByteburyIcon";
import { CustomerNavigation } from "./CustomerNavigation";
import { DefaultNavigation } from "./DefaultNavigation";
import { GoBackButton } from "../buttons/GoBackButton";
import Link from "next/link";
import { MatIcon } from "../icons/MatIcon";
import { PATCH } from "@/app/utils/http-client";
import { SignedInNavigation } from "./SignedInNavigation";
import { selectCurrentUser } from "@/lib/features/users/usersSlice";
import { selectPendingApprovals } from "@/lib/features/pending-transactions/pendingTransactionsSlice";
import { useAppSelector } from "@/lib/hooks";
import { useCustomerAuth } from "@/app/guards/CustomerAuthContext";
import { useSnackbar } from "../snackbar/snackbar-context";

export function AppBar() {
  const [scrolled, setScrolled] = useState(false);
  const [isAppDrawerOpen, setIsAppDrawerOpen] = useState(false);
  const shouldDisplayGoBack = useAppSelector(
    (state) => state.appBar.shouldDisplayGoBack
  );
  const currentUser = useAppSelector(selectCurrentUser);
  const { isLoggedIn: isLoggedInAsCustomer } = useCustomerAuth();
  const pendingTransactions = useAppSelector(selectPendingApprovals);
  const { showSnackbar } = useSnackbar();

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

  async function resendAccountVerificationEmail(): Promise<void> {
    try {
      const response = await PATCH("/users/email/resend", {
        email: currentUser.email,
      });

      if (response.ok) {
        showSnackbar(
          "Controleer je e-mail en volg de stappen om je account te verifiëren",
          "Sluiten",
          8_000
        );
      } else {
        const { message } = await response.json();
        showSnackbar(message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <header
        className={
          scrolled ? "top-bar-container scrolled" : "top-bar-container"
        }
      >
        <div className="leading-icon">
          {shouldDisplayGoBack ? (
            <GoBackButton>
              <MatIcon icon="arrow-back" />
            </GoBackButton>
          ) : (
            <button
              className="icon relative group"
              onClick={toggleDrawer}
              aria-label="Navigatie menu knop"
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
            <h1>Navigatie</h1>
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
            The Money Game
          </Link>
        </h1>
        <div className="trailing-icon"></div>
      </header>
      {currentUser && !currentUser?.verified && (
        <div className="bg-orange-100 p-4 mb-4 border-y border-orange-200 text-sm text-center">
          We vereisen e-mailverificatie. Controleer je e-mail en volg de
          aanwijzingen. Als je niets vindt, controleer je{" "}
          <strong>spamfolder</strong> of{" "}
          <button
            onClick={resendAccountVerificationEmail}
            className="underline inline text-primary"
          >
            klik om opnieuw te verzenden
          </button>
          . Je kunt je e-mail wijzigen in{" "}
          <strong>Instellingen &rarr; Beveiliging</strong>
        </div>
      )}
    </>
  );
}
