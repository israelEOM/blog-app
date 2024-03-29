import { prisma } from "@/app/api/client"
import React from "react"
import { Post as PostType } from "@prisma/client"
import { FormattedPost } from "@/app/types"
import Content from "@/app/post/[id]/Content"

type Props = {
  params: { id: string }
}

export const revalidate = 60

const getPost = async (id: string) => {
  const post: PostType | null = await prisma.post.findUnique({
    where: { id },
  })

  if (!post) {
    console.log(`Post with id ${id} not found`)
    return null
  }

  const formattedPost = {
    ...post,
    createdAt: post?.createdAt?.toISOString(),
    updatedAt: post?.updatedAt?.toISOString(),
  }

  return formattedPost
}

const Post = async ({ params }: Props) => {
  const { id } = params
  const post: FormattedPost | null = await getPost(id)

  if (!post) {
    return <div>Post Not Found</div>
  }

  return (
    <main className="px-10 leading-7">
      <div className="md:flex gap-10 mb-5">
        <div className="basis-full">
          <Content 
            post={post}
            actionUrl={`${process.env.NEXT_PUBLIC_URL}/api/post/${post?.id}`}
            actionMethod='PATCH'
          />
        </div>
      </div>
    </main>
  )
}

export default Post