"use client";

import { NoCustomerGuard } from "@/app/guards/NoCustomerGuard";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return <NoCustomerGuard>{children}</NoCustomerGuard>;
}
