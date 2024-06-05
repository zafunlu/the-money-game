"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

import { AnnouncementList } from "./AnnouncementList";
import { AuthenticatedGuard } from "@/app/guards/AuthGuard";
import { BankList } from "./BankList";
import { Card } from "@/app/components/card/Card";
import { CreateBankDialog } from "./CreateBankDialog";
import { Dialog } from "@/app/components/dialog/Dialog";
import { HelpText } from "@/app/components/help-text/HelpText";
import Link from "next/link";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { Notice } from "@/app/components/notice/Notice";
import { PremiumButton } from "@/app/components/buttons/PremiumButton";
import { StoreList } from "./StoreList";
import { SubscriptionTier } from "@/lib/models/User";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { selectCurrentUser } from "@/lib/features/users/usersSlice";
import { selectFeatures } from "@/lib/features/config/configSlice";

export default function DashboardPage() {
  const features = useAppSelector(selectFeatures);
  const user = useAppSelector(selectCurrentUser);
  const dialogs = useAppSelector<any>((state) => state.dialogs);
  const dispatch = useAppDispatch();
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const getDisclaimer = localStorage.getItem("disclaimer_acknowledged");

    if (!getDisclaimer) {
      setShowDisclaimer(true);
    }
  }, []);

  function acknowledge(): void {
    localStorage.setItem("disclaimer_acknowledged", "true");
    setShowDisclaimer(false);
  }

  function openCreateBankDialog() {
    dispatch(dialogsAction.openCreateBankDialog());
  }

  return (
    <AuthenticatedGuard>
      <main className="container max-w-7xl h-full">
        <div className="flex flex-col md:flex-row gap-4">
          {/* left-hand side */}
          <div className="flex flex-col gap-4">
            <Card
              type="outlined"
              className="flex flex-col gap-4 w-full md:w-72 shrink-0"
            >
              <section className="flex items-center justify-between">
                <h1>Banks</h1>
                <button
                  onClick={openCreateBankDialog}
                  className="sm common filled"
                >
                  <MatIcon icon="add" />
                  New
                </button>
                {dialogs?.createBank && <CreateBankDialog />}
              </section>
              <nav>
                <BankList />
              </nav>
            </Card>
            {features?.stores && (
              <Card
                type="outlined"
                className="flex flex-col gap-4 w-full md:w-72 shrink-0"
              >
                <section className="flex items-center justify-between">
                  <h1 className="flex items-center gap-1">
                    Stores{" "}
                    <HelpText size={20}>
                      A place where customers can purchase items
                    </HelpText>
                  </h1>
                  {user.subscription_tier < SubscriptionTier.Premium ? (
                    <PremiumButton>Get Premium</PremiumButton>
                  ) : (
                    <button
                      onClick={openCreateBankDialog}
                      className="sm common filled"
                    >
                      <MatIcon icon="add" />
                      New
                    </button>
                  )}
                </section>
                <nav>
                  <StoreList />
                </nav>
              </Card>
            )}
          </div>
          {/* right-hand side */}
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex flex-col gap-4">
              <Notice icon="waving-hand-outline">
                <span className="text-sm">
                  Welcome to the new Fun Banking website. Please be sure to
                  report any bugs via the &quot;Send Feedback&quot; button.
                </span>
              </Notice>
              <Card className="flex flex-col gap-2 w-full" type="outlined">
                <div className="flex items-center justify-between">
                  <h1 className="text-lg">Dashboard</h1>
                  <Link
                    className="common text-sm filled-tonal"
                    href={
                      "mailto:bytebury@gmail.com?subject=Feedback for Fun Banking"
                    }
                  >
                    Send Feedback
                  </Link>
                </div>
                <section className="flex flex-col gap-2">
                  <p>
                    This is the dashboard — where you&apos;ll find some
                    high-level updates about what&apos;s going on in your banks.
                    Including some informational updates from the Fun Banking
                    team. Although, we&apos;re still in the middle of developing
                    it further.
                  </p>
                  <p>
                    You can{" "}
                    <button
                      onClick={openCreateBankDialog}
                      className="inline-block underline text-primary"
                    >
                      create a bank
                    </button>{" "}
                    to get started.
                  </p>
                </section>
              </Card>
            </div>
            <div className="flex flex-col gap-4">
              <Card
                className="flex flex-col gap-2 w-full xl:w-80"
                type="outlined"
              >
                <h2 className="text-lg font-extrabold">Latest News</h2>
                <AnnouncementList />
              </Card>
            </div>
          </div>
        </div>
      </main>
      {showDisclaimer && (
        <Dialog>
          <header>
            <MatIcon icon="warning-outline" />
            <h1>Fun Banking is a Simulator</h1>
          </header>
          <div className="flex flex-col gap-2">
            <p>
              Fun Banking is an online simulation designed for educators and
              families with the aim of instructing young adults in acquiring
              effective money management skills.
            </p>
            <p>
              The funds within Fun Banking are{" "}
              <u>simulated and hold no real-world value</u>; therefore,{" "}
              <u>refrain</u> from inputting genuine information into our system.
            </p>
          </div>
          <footer>
            <button onClick={acknowledge} className="common ghost">
              Acknowledge
            </button>
          </footer>
        </Dialog>
      )}
    </AuthenticatedGuard>
  );
}
