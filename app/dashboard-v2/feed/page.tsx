import FeedHeader from "@/components/v2/feed/FeedHeader";
import FeedOverviewCard from "@/components/v2/feed/FeedOverviewCard";
import FeedList from "@/components/v2/feed/FeedList";
import FloatingFeedButton from "@/components/v2/feed/FloatingFeedButton";

export default function FeedPage() {
  return (
    <div className="space-y-6">
      <FeedHeader />

      <FeedOverviewCard />

      <FeedList />

      <FloatingFeedButton />
    </div>
  );
}