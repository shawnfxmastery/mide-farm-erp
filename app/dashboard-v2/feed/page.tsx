import AppLayout from "@/components/v2/layout/AppLayout";

import FeedHeader from "@/components/v2/feed/FeedHeader";
import FeedOverviewCard from "@/components/v2/feed/FeedOverviewCard";
import FeedList from "@/components/v2/feed/FeedList";
import FloatingFeedButton from "@/components/v2/feed/FloatingFeedButton";

export default function FeedPage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <FeedHeader />

        <FeedOverviewCard />

        <FeedList />
      </div>

      <FloatingFeedButton />
    </AppLayout>
  );
}