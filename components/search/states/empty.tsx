import { Button } from "@/components/ui/button";
import { Bus } from "lucide-react";

export default function EmptyState({
  onclick,
  title,
  hasFilters = true,
}: {
  onclick?: () => void;
  title: string;
  hasFilters?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <Bus size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        No {title} Found
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        We couldn't find any {title} matching your current search and filter
        criteria.
      </p>
      {hasFilters && (
        <Button variant="link" className="mt-4 text-primary" onClick={onclick}>
          Reset Filters and Search Again
        </Button>
      )}
    </div>
  );
}
