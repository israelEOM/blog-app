"use client"
import { Post } from "@prisma/client"
import React, { useState } from "react"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid"
import Card from "./Card"

type Props = {
  posts: Array<Post>
}

const List = ({ posts }: Props) => {
  const [list, setList] = useState(posts.slice(0, 4))
  const [cursor, setCursor] = useState(4)

  const nextPage = async () => {
    const postsList: Array<Post> = []
    const max = (cursor + 4) > posts.length ? posts.length : cursor + 4

    posts.forEach((post: Post, i: number) => {
      if (i >= cursor && i < max) {
        postsList.push(post)
      }
    })

    setList(postsList)
    setCursor(max)
  }

  const prevPage = async () => {
    const postsList: Array<Post> = []
    const decrement = cursor % 4 === 0 ? 4 : (posts.length) % 4
    const max = (cursor - decrement) < 4 ? 4 : cursor - decrement

    posts.forEach((post: Post, i: number) => {
      if (i >= max - 4 && i < max) {
        postsList.push(post)
      }
    })

    setList(postsList)
    setCursor(max)
  }

  return (
    <section className="pt-4 mb-8">
      {/* HEADER */}
      <p className="font-bold text-2xl my-4">Posts List</p>
      <div className="sm:grid grid-cols-2 gap-16">
        {list.map((post) => {
          return <Card
            key={post.id}
            className="mt-5 sm:mt-0"
            imageHeight="h-80"
            post={post}
          />
        })}
      </div>
      <div className="flex my-8 items-center justify-center gap-16">
        <button type="button" onClick={prevPage} disabled={cursor === 4}>
          <ChevronLeftIcon className="h-8 w-8 text-accent-orange hover:text-wh-300" />
        </button>
        <button type="button" onClick={nextPage} disabled={cursor === posts.length}>
          <ChevronRightIcon className="h-8 w-8 text-accent-orange hover:text-wh-300" />
        </button>
      </div>
    </section>
  )
}

export default List