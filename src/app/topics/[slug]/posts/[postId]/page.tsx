import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { paths } from "@/paths";
import { db } from "@/db";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import { Suspense } from "react";
import PostShowLoading from "@/components/posts/post-show-loading";
import CommentShowLoading from "@/components/comments/comment-show-loading";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}
let CommentLoading: React.ReactNode[] = [];
for (let i = 0; i < 5; i++) {
  CommentLoading.push(<CommentShowLoading level={1} />)
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <Suspense fallback={CommentLoading}>
        <CommentList fetchData={() => fetchCommentsByPostId(postId)} />
      </Suspense>
    </div>
  );
}
