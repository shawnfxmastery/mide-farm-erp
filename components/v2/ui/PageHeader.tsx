"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function PageHeader({
  title,
  subtitle,
  buttonText,
  buttonHref,
}: Props) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-1 text-slate-500">
          {subtitle}
        </p>
      </div>

      {buttonText && buttonHref && (
        <Link
          href={buttonHref}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
        >
          <Plus size={18} />
          {buttonText}
        </Link>
      )}
    </div>
  );
}