import FeedUsageHeader from "@/components/v2/feed-usage/FeedUsageHeader";
import FeedUsageOverviewCard from "@/components/v2/feed-usage/FeedUsageOverviewCard";
import FeedUsageList from "@/components/v2/feed-usage/FeedUsageList";
import FloatingFeedUsageButton from "@/components/v2/feed-usage/FloatingFeedUsageButton";

export default function FeedUsagePage() {
  return (
    <div className="space-y-6">
      <FeedUsageHeader />

      <FeedUsageOverviewCard />

      <FeedUsageList />

      <FloatingFeedUsageButton />
    </div>
  );
}