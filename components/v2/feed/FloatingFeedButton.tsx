import Link from "next/link";

export default function FloatingFeedButton() {
  return (
    <Link
      href="/dashboard-v2/feed/new"
      className="fixed bottom-6 right-6 rounded-full bg-green-600 px-6 py-4 font-semibold text-white shadow-lg"
    >
      + Feed
    </Link>
  );
}