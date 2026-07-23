interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  icon,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
      {icon && (
        <div className="mb-4 flex justify-center text-5xl">
          {icon}
        </div>
      )}

      <h2 className="text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>
    </div>
  );
}