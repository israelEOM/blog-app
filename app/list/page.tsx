import { prisma } from '@/app/api/client'
import { Post } from '@prisma/client'
import List from '../(shared)/List'

export const revalidate = 60

const getPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: 'desc'
    },
  })

  return posts
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="px-10 pb-4 leading-7">
      <List posts={posts} />
    </main>
  )
}
