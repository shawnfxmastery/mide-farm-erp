import EditProductionForm from "./EditProductionForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductionPage({ params }: Props) {
  const { id } = await params;

  return <EditProductionForm id={id} />;
}