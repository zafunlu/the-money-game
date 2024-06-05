"use client";

import {
  banksAction,
  selectCurrentBank,
} from "@/lib/features/banks/banksSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";

import { Card } from "@/app/components/card/Card";
import { CustomerSignInForm } from "./form";
import { NoCustomerGuard } from "@/app/guards/NoCustomerGuard";
import { NonAuthenticatedGuard } from "@/app/guards/NonAuthGuard";
import { Notice } from "@/app/components/notice/Notice";
import { POST } from "@/app/utils/http-client";
import { useParams } from "next/navigation";

export default function BankSignInPage() {
  const { username, slug } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const bank = useAppSelector(selectCurrentBank);

  useEffect(() => {
    setIsLoading(true);

    sessionStorage.setItem("last_bank", `/${username}/${slug}`);

    const fetchBank = async () => {
      try {
        const response = await POST(`/banks`, { username, slug });

        if (response.ok) {
          const bank = await response.json();
          dispatch(banksAction.setBank(bank));
        } else {
          // TODO: GO TO 404
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBank();
  }, [username, slug, dispatch]);

  if (isLoading || !bank) {
    return (
      <NonAuthenticatedGuard>
        <main className="container max-w-2xl">
          <Card className="flex flex-col gap-4" type="outlined">
            <section>Loading Bank Information...</section>
          </Card>
        </main>
      </NonAuthenticatedGuard>
    );
  }

  return (
    <NonAuthenticatedGuard>
      <NoCustomerGuard>
        <main className="container max-w-2xl">
          <Card className="flex flex-col gap-4" type="outlined">
            <Notice icon="warning-outline">
              <span className="text-sm">
                The Money Game is een online bank simulator voor educatieve
                doeleinden. Voer geen echte bankgegevens in.
              </span>
            </Notice>
            <section>
              <h1 className="text-xl">Sign in to {bank.name}</h1>
              <p>{bank.description}</p>
            </section>
            <CustomerSignInForm bankId={bank.id} />
          </Card>
        </main>
      </NoCustomerGuard>
    </NonAuthenticatedGuard>
  );
}
