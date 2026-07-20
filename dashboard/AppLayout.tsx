"use client";

import { ReactNode, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prevent background scrolling when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-slate-950">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile Sidebar */}

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          sidebarOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur-md lg:hidden">

          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl p-2 transition hover:bg-slate-800"
            aria-label="Open Menu"
          >
            <Menu
              size={24}
              className="text-white"
            />
          </button>

          <h1 className="truncate text-lg font-bold text-green-400">
            Mide Farm ERP
          </h1>

          {/* Spacer */}
          <div className="w-10" />

        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden p-4 text-white sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}