import EditFeedForm from "./EditFeedForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditFeedForm id={id} />;
}