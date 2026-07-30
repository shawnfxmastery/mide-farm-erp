"use client";

import {
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info";

export type ToastItem = {
  id: number;
  title: string;
  message: string;
  type: ToastType;
};

type Props = {
  toast: ToastItem;
  onClose: (id: number) => void;
};

export default function Toast({
  toast,
  onClose,
}: Props) {
  const config = {
    success: {
      icon: CheckCircle2,
      iconColor: "text-green-600",
      border: "border-green-300",
      bg: "bg-green-50",
      progress: "bg-green-500",
    },

    error: {
      icon: AlertCircle,
      iconColor: "text-red-600",
      border: "border-red-300",
      bg: "bg-red-50",
      progress: "bg-red-500",
    },

    warning: {
      icon: AlertTriangle,
      iconColor: "text-orange-600",
      border: "border-orange-300",
      bg: "bg-orange-50",
      progress: "bg-orange-500",
    },

    info: {
      icon: Info,
      iconColor: "text-blue-600",
      border: "border-blue-300",
      bg: "bg-blue-50",
      progress: "bg-blue-500",
    },
  }[toast.type];

  const Icon = config.icon;

  return (
    <div
      className={`
        overflow-hidden
        rounded-2xl
        border
        shadow-xl
        backdrop-blur
        ${config.border}
        ${config.bg}
        animate-in
        slide-in-from-top-4
        duration-300
      `}
    >
      <div className="flex items-start gap-4 p-5">
        <Icon
          className={config.iconColor}
          size={28}
        />

        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">
            {toast.title}
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            {toast.message}
          </p>
        </div>

        <button
          onClick={() => onClose(toast.id)}
          className="text-slate-400 transition hover:text-slate-700"
        >
          <X size={18} />
        </button>
      </div>

      <div className="h-1 w-full bg-slate-200">
        <div
          className={`${config.progress} h-full animate-[shrink_4s_linear_forwards]`}
        />
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}