"use server"
import { auth } from "@/auth"
import { db } from "@/db"
import { paths } from "@/paths"
import { Topic } from "@prisma/client"
import { redirect } from "next/navigation"
import { z } from "zod"

const createTopicSchema = z.object( {
  name: z.string().min( 3 ).regex( /^[a-z-]+$/, { message: "Must be lowercase letters or dashes without spaces" } ),
  description: z.string().min( 10 )
} )

interface CreateTopicFormState
{
  errors: {
    name?: string[],
    description?: string[],
    _form?:string[]
  }
}

export async function createTopic ( formState: any, formData: FormData ): Promise<CreateTopicFormState>
{

  await new Promise((res) => setTimeout(res,2000))
  const name = formData.get( "name" )
  const description = formData.get( "description" )
  const result = createTopicSchema.safeParse( {
    name, description
  } )

  if ( !result.success )
  {
    return {
      errors:result.error.flatten().fieldErrors
    }
  }

  const session = await auth()
  if(!session || !session.user){
    return {
      errors:{
        _form:["You must be signed in to do this"]
      }
    }
  }
  
  let topic:Topic

  try{
    topic = await db.topic.create({
      data:{
        slug:result.data.name,
        description:result.data.description,
      }
    })
  }catch(err:unknown){
    if(err instanceof Error){
      return {
        errors:{
          _form:[err.message]
        }
      }
    }
    return {
      errors:{
        _form:["Something went wrong"]
      }
    }
  }
  
  redirect(paths.topicShow(topic.slug))
  // TODO: revalidate the homepage
}