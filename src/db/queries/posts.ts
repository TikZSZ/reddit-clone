import { Post } from "@prisma/client";
import { db } from "..";

export type PostWithData = ( Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
} )

const include = {
  topic: {
    select: {
      slug: true
    }
  },
  user: {
    select: {
      name: true
    }
  },
  _count: {
    select: {
      comments: true
    }
  }
}


export async function fetchPostsByTopicSlug ( topicId: string, slug: string ):Promise<PostWithData[]>
{
  const posts = await db.post.findMany( {
    where: {
      topicId,
    },
    include: include
  } )

  return posts.map( ( post ) =>
  {
    return {
      ...post,
      topic: {
        slug
      }
    }
  } )
}

export async function fetchTopPosts (): Promise<PostWithData[]>
{
  return db.post.findMany( {
    orderBy: {
      comments: {
        _count: "desc"
      }
    },
    include: include
  } )
}

export function fetchPostsBySearchTerm (term:string): Promise<PostWithData[]>
{
  return db.post.findMany({
    include:include,
    where:{
      OR:[
        {
          title:{
            contains:term
          }
        },
        {
          content:{
            contains:term
          }
        }
      ]
    }
  })
}