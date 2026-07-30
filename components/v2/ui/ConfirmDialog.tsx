"use client";

import { AlertTriangle, Loader2 } from "lucide-react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "red" | "orange" | "green";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "red",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  const buttonColor = {
    red: "bg-red-600 hover:bg-red-700",
    orange: "bg-orange-500 hover:bg-orange-600",
    green: "bg-green-600 hover:bg-green-700",
  }[confirmColor];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl">

        <div className="border-b p-5">

          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">

            <AlertTriangle
              className="text-red-600"
              size={24}
            />

          </div>

          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <p className="mt-3 text-slate-500">
            {message}
          </p>

        </div>

        <div className="flex justify-end gap-3 p-5">

          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border px-5 py-2.5 font-medium hover:bg-slate-50 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-xl px-5 py-2.5 font-medium text-white transition ${buttonColor} disabled:opacity-60`}
          >

            {loading ? (

              <span className="flex items-center gap-2">

                <Loader2
                  className="animate-spin"
                  size={18}
                />

                Processing...

              </span>

            ) : (
              confirmText
            )}

          </button>

        </div>

      </div>

    </div>
  );
}