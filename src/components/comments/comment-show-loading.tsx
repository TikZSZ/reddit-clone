import { Skeleton } from "@nextui-org/react";

export default function CommentShowLoading(
  { level }: { level: number } = { level: 1 }
) {
  if (level === 4) {
    return null;
  }
  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Skeleton className="h-8 w-8 rounded-full"></Skeleton>
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            <Skeleton className="h-6 w-32 rounded-lg" />
          </p>
          <p className="text-gray-900">
            <Skeleton className="h-6 w-32 rounded-lg" />
          </p>
        </div>
      </div>
      <div className="pl-4">
        <CommentShowLoading level={level + 1} />
      </div>
    </div>
  );
}
