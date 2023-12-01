import { db } from "..";
import type {Comment} from "@prisma/client"

export type CommentWithAuthor = Comment & {
  user:{
    image:string|null,
    name:string|null
  }
}


export async function fetchCommentsByPostId(postId:string):Promise<CommentWithAuthor[]>{
  return db.comment.findMany({
    where:{
      postId
    },
    include:{
      user:{
        select:{
          name:true,
          image:true
        }
      }
    }
  })
}