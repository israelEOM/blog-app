import React from "react"
// import ReactPlayer from 'react-player'
import Card from "app/(shared)/Card"
import { Post } from "@prisma/client"

type Props = {
  listPosts: Array<Post>
}

const PostList = ({ listPosts }: Props) => {
  return (
    <section>
      <hr className="border-1" />
      {/* HEADER */}
      <div className="flex items-center gap-3 my-8">
        <h4 className="bg-accent-orange py-2 px-5 text-wh-900 text-sm font-bold">
          HOT
        </h4>
        <p className="font-bold text-2xl">Latest News in Our Blog</p>
      </div>

      {/* grid */}
      <div className="sm:grid grid-cols-2 grid-rows-3 gap-6 my-5">

        {/* <ReactPlayer url='https://www.youtube.com/watch?v=pfHjxyeCHRs' className='react-player' /> */}
        {/* LARGE CARD */}
        <Card
          className="col-span-1 row-span-3"
          imageHeight="h-96"
          post={listPosts[3]}
          isLongForm
        />
        {/* SMALL CARDS */}
        <Card
          className="col-span-1 row-span-1 mt-10 sm:mt-0 flex justify-between gap-3"
          imageHeight="h-48"
          post={listPosts[2]}
          isSmallCard
        />
        <Card
          className="col-span-1 row-span-1 mt-10 sm:mt-0 flex justify-between gap-3"
          imageHeight="h-48"
          post={listPosts[1]}
          isSmallCard
        />
        <Card
          className="col-span-1 row-span-1 mt-10 sm:mt-0 flex justify-between gap-3"
          imageHeight="h-48"
          post={listPosts[0]}
          isSmallCard
        />
      </div>
    </section>
  )
}

export default PostList