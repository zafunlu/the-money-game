"use client";

import { Card } from "@/app/components/card/Card";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { Notice } from "@/app/components/notice/Notice";
import { AuthenticatedGuard } from "@/app/guards/AuthGuard";
import Link from "next/link";
import { AnnouncementList } from "./AnnouncementList";
import { BankList } from "./BankList";
import { CreateBankDialog } from "./CreateBankDialog";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";

export default function DashboardPage() {
  const dialogs = useAppSelector<any>((state) => state.dialogs);
  const dispatch = useAppDispatch();

  function openCreateBankDialog() {
    dispatch(dialogsAction.openCreateBankDialog());
  }

  return (
    <AuthenticatedGuard>
      <main className="container max-w-7xl h-full">
        <div className="flex flex-col md:flex-row gap-4">
          {/* left-hand side */}
          <div>
            <Card type="outlined" className="flex flex-col gap-4 w-full md:w-72 shrink-0">
              <section className="flex items-center justify-between">
                <h1>Banks</h1>
                <button onClick={openCreateBankDialog} className="sm common filled">
                  <MatIcon icon="add" />
                  New
                </button>
                {dialogs?.createBank && <CreateBankDialog />}
              </section>
              <nav>
                <BankList />
              </nav>
            </Card>
          </div>
          {/* right-hand side */}
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex flex-col gap-4">
              <Notice icon="waving-hand-outline">
                <span className="text-sm">
                  Welcome to the new Fun Banking website. Please be sure to report any bugs via the
                  &quot;Send Feedback&quot; button.
                </span>
              </Notice>
              <Card className="flex flex-col gap-2 w-full" type="outlined">
                <div className="flex items-center justify-between">
                  <h1 className="text-lg">Dashboard</h1>
                  <Link
                    className="common text-sm filled-tonal"
                    href={"mailto:bytebury@gmail.com?subject=Feedback for Fun Banking"}
                  >
                    Send Feedback
                  </Link>
                </div>
                <section className="flex flex-col gap-2">
                  <p>
                    This is the dashboard — where you&apos;ll find some high-level updates about
                    what&apos;s going on in your banks. Including some informational updates from
                    the Fun Banking team. Although, we&apos;re still in the middle of developing it
                    further.
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
              <Card className="flex flex-col gap-2 w-full xl:w-80" type="outlined">
                <h2 className="text-lg font-extrabold">Latest News</h2>
                <AnnouncementList />
              </Card>
            </div>
          </div>
        </div>
      </main>
    </AuthenticatedGuard>
  );
}
