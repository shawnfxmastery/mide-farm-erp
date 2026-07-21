import Link from "next/link";

export default function FloatingFeedUsageButton() {
  return (
    <Link
      href="/dashboard-v2/feed-usage/new"
      className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-3xl font-bold text-white shadow-lg transition hover:bg-green-700"
    >
      +
    </Link>
  );
}