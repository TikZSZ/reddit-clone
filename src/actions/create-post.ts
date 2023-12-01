"use server"

import { auth } from "@/auth"
import { db } from "@/db"
import { paths } from "@/paths"
import { Post } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

interface CreatePostFormState
{
  errors: {
    title?: string[],
    content?: string[],
    _form?: string[]
  }
}

const createPostSchema = z.object( {
  title: z.string().min( 3 ),
  content: z.string().min( 10 ),
} )

export async function createPost ( slug:string,topicId: string, _: CreatePostFormState, formData: FormData ): Promise<CreatePostFormState>
{
  const title = formData.get( "title" )
  const content = formData.get( "content" )
  const result = createPostSchema.safeParse( {title,content} )

  if ( !result.success )
  {
    console.log( "error" );

    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  const session = await auth()

  if ( session && !session.user )
  {
    return {
      errors: {
        _form: [ "You must be signed in to do this" ]
      }
    }
  }

  let post: Post

  try
  {
    const { title, content, } = result.data
    post = await db.post.create( {
      data: {
        title,
        content,
        topicId: topicId,
        userId: ( session?.user! as any ).id,
      }
    } )
  } catch ( err: unknown )
  {
    let error: string
    err instanceof Error ?
      error = err.message : error = "Something went wrong"
    return {
      errors: {
        _form: [ error ]
      }
    }
  }
  // Revalidate the topic show Page
  revalidatePath(paths.topicShow(slug))
  redirect( paths.postShow( slug, post.id ) )

  return {
    errors: {}
  }
}