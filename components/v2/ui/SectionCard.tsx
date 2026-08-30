import { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

export default function SectionCard({
  children,
  className = "",
}: SectionCardProps) {
  return (
    <div
      className={`rounded-lg border border-[#edebe9] bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
