import { Skeleton } from "@nextui-org/react";

const PostLoading = <div className="border rounded p-2">
<div>
  <h3 className="text-lg font-bold">
    {" "}
    <Skeleton className="h-6 w-52" />
  </h3>
  <div className="flex flex-row gap-8">
    <p className="text-xs text-gray-400">
      By <Skeleton className="h-6 w-8" />
    </p>
  </div>
</div>
</div>

export default async function PostListLoading() {
  return (
    <div className="space-y-2">
      {PostLoading}
      {PostLoading}
      {PostLoading}

    </div>
  );
}
