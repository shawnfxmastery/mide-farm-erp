"use client";

import { ReactNode } from "react";
import BottomNavigation from "@/components/v2/navigation/BottomNavigation";

type Props = {
  children: ReactNode;
};

export default function AppLayout({
  children,
}: Props) {
  return (
    <div className="min-h-screen bg-slate-50">

      <main
        className="
        mx-auto
        min-h-screen
        w-full
        max-w-7xl
        px-4
        pb-28
        pt-6

        sm:px-6
        lg:px-10
      "
      >
        {children}
      </main>

      <BottomNavigation />

    </div>
  );
}