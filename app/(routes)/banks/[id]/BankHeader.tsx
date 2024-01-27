"use client";

import { CopyButton } from "@/app/components/buttons/CopyButton";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { AppConstants } from "@/app/constants/app-constants";
import Link from "next/link";
import { useState } from "react";

type BankHeaderProps = { bank: any };

export function BankHeader({ bank }: BankHeaderProps) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <section className="flex flex-col gap-2">
        <h1 className="text-2xl flex gap-1">
          <Link href={`/banks/${bank.id}`}>{bank.owner.username}</Link>/
          <Link href={`/banks/${bank.id}`}>{bank.slug}</Link>
        </h1>
        <p>{bank.description}</p>
        <CopyButton
          className="flex flex-row items-center gap-1 w-fit font-normal text-sm text-primary underline"
          value={`${AppConstants.APP_URL}/${bank.owner.username}/${bank.slug}`}
          onCopied={setCopied}
        >
          <MatIcon
            icon={`${copied ? "inventory" : "content-paste"}`}
            className={`h-5 w-5 ${copied ? "text-primary" : "text-gray-600"}`}
          />
          {bank.owner.username}/{bank.slug}
        </CopyButton>
      </section>
    </>
  );
}
