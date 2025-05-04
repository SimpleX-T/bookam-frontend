import { Button } from "../ui/button";

export default function SearchPagination() {
  return (
    <div className="flex justify-center items-center gap-1 py-4 text-sm">
      <Button
        variant="outline"
        size="sm"
        disabled={true}
        className="dark:text-white dark:border-gray-600 disabled:bg-opacity-20 disabled:cursor-not-allowed"
      >
        Prev
      </Button>
      <Button
        variant="outline"
        size="icon"
        disabled
        className="w-8 h-8 bg-primary text-primary-foreground border-primary"
      >
        1
      </Button>
      <Button
        variant="ghost"
        disabled
        size="icon"
        className="w-8 h-8 dark:text-white"
      >
        2
      </Button>
      <Button
        disabled
        variant="ghost"
        size="icon"
        className="w-8 h-8 dark:text-white"
      >
        3
      </Button>
      <span className="text-gray-500 dark:text-gray-400">...</span>
      <Button
        variant="outline"
        size="sm"
        disabled={true}
        className="dark:text-white dark:border-gray-600 disabled:bg-opacity-20 disabled:cursor-not-allowed"
      >
        Next
      </Button>
    </div>
  );
}
