"use client";

import { ReactNode, useState } from "react";

import MobileHeader from "./MobileHeader";
import SideDrawer from "./SideDrawer";

type Props = {
  children: ReactNode;
};

export default function AppLayout({
  children,
}: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <SideDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="min-h-screen bg-slate-50">
        <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <MobileHeader
            onMenuClick={() => setDrawerOpen(true)}
          />

          {children}
        </main>
      </div>
    </>
  );
}