import FeedHeader from "@/components/v2/feed/FeedHeader";
import FeedOverviewCard from "@/components/v2/feed/FeedOverviewCard";
import FeedQuickActions from "@/components/v2/feed/FeedQuickActions";
import FeedTabs from "@/components/v2/feed/FeedTabs";
import FloatingFeedButton from "@/components/v2/feed/FloatingFeedButton";

export default function FeedPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-xl space-y-5">
        <FeedHeader />

        <FeedOverviewCard />

        <FeedQuickActions />

        <FeedTabs />
      </div>

      <FloatingFeedButton />
    </>
  );
}