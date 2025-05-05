import { Badge } from "@/components/ui/badge";

type Status =
  | "completed"
  | "approved"
  | "pending"
  | "cancelled"
  | "rejected"
  | string;

export const renderStatusBadge = (status: Status) => {
  let variant: "default" | "outline" | "secondary" | "destructive" = "outline";
  let className =
    "bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-200";

  switch (status.toLowerCase()) {
    case "checked-in":
      className =
        "bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-400 text-xs";
      break;
    case "completed":
    case "approved":
    case "verified":
    case "active":
    case "open":
      className =
        "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 text-xs";
      break;
    case "pending":
      className =
        "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400 text-xs";
      break;
    case "cancelled":
    case "rejected":
    case "unverified":
      className =
        "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 text-xs";
      break;
  }

  return (
    <Badge variant={variant} className={className}>
      {status.toUpperCase()}
    </Badge>
  );
};
