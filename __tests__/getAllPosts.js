import { describe } from "node:test"
import { prisma } from "../app/api/client"
import '@testing-library/jest-dom'

describe("Check we get all posts from our blog", () => {
  test("check if we have any posts",
    async () => {
      const posts = await prisma.post.findMany()

      expect(posts.length > 0).toBe(true)
    }
  )
})
