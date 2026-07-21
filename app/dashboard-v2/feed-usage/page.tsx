import AppLayout from "@/components/v2/layout/AppLayout";

import FeedUsageHeader from "@/components/v2/feed-usage/FeedUsageHeader";
import FeedUsageOverviewCard from "@/components/v2/feed-usage/FeedUsageOverviewCard";
import FeedUsageList from "@/components/v2/feed-usage/FeedUsageList";
import FloatingFeedUsageButton from "@/components/v2/feed-usage/FloatingFeedUsageButton";

export default function FeedUsagePage() {
  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <FeedUsageHeader />

        <FeedUsageOverviewCard />

        <FeedUsageList />
      </div>

      <FloatingFeedUsageButton />
    </AppLayout>
  );
}