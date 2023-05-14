import { prisma } from "@/app/api/client"
import React from "react"
import Content from "@/app/post/[id]/Content"

const Post = async () => {

  return (
    <main className="px-10 leading-7">
      <div className="md:flex gap-10 mb-5">
        <div className="basis-full">
          <Content 
            actionUrl={`${process.env.NEXT_PUBLIC_URL}/api/post`}
            actionMethod='POST'
          />
        </div>
      </div>
    </main>
  )
}

export default Post