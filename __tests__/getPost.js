import { describe } from "node:test"
import { prisma } from "../app/api/client"
import '@testing-library/jest-dom'

describe("Check we an specific post from our blog", () => {
  test("check if post exists",
    async () => {
      const { id } = await prisma.post.findFirst()

      const post = await prisma.post.findUnique({
        where: { id },
      })

      expect(post).not.toBe(null)
    }
  )
})
