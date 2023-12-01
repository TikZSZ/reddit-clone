import PostList from "@/components/posts/post-list";
import PostCreateForm from "@/components/posts/posts-create-form";
import { db } from "@/db";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params;
  const topic = await db.topic.findFirst({
    where: {
      slug,
    },
  });
  if (!topic) {
    return <div>Topic does not exist</div>;
  }
  const fetchData = () => fetchPostsByTopicSlug(topic.id, slug);

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={fetchData}></PostList>
      </div>
      <div>
        <PostCreateForm slug={slug} topicId={topic.id}></PostCreateForm>
      </div>
    </div>
  );
}
