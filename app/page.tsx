import Hero from './(home)/Hero'
import PostList from './(home)/PostList'
import { prisma } from './api/client'
import { Post } from '@prisma/client'

export const revalidate = 60

const getPosts = async () => {
  const posts = await prisma.post.findMany()

  return posts
}

export default async function Home() {
  const posts = await getPosts()

  const formatPosts = () => {
    const heroPosts: Array<Post> = []
    const otherPosts: Array<Post> = []

    posts.forEach((post: Post, i: number) => {
      if (i < 4) {
        heroPosts.push(post)
      }else if (i > (posts.length - 5)) {
        otherPosts.push(post)
      }
    })

    return [heroPosts, otherPosts]
  }

  const [heroPosts, otherPosts] = formatPosts()

  return (
    <main className="px-10 leading-7">
      <Hero heroPosts={heroPosts} />
      <div className="md:flex gap-10 mb-5">
        <div className="w-full">
          <PostList listPosts={otherPosts} />
          <div className="hidden md:block">
            {/* <AddPost /> */}
          </div>
        </div>

      </div>
    </main>
  )
}
