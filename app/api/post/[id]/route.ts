import { NextResponse } from "next/server"
import { prisma, removeTags } from "@/app/api/client"

type Params = { params: { id: string } }

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = params
    const { category, title, content } = await request.json()
    const snippet = await removeTags(content)

    const post = await prisma.post.update({
      where: { id: id },
      data: { category, title, content, snippet },
    })
    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.error("request error", error)
    NextResponse.json({ error: "error updating post" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params
    const post = await prisma.post.findMany({
      where: {
        title: {
          contains: id
        }
      },
      take: 5
    })
    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.error("request error", error)
    NextResponse.json({ error: "error filtering posts" }, { status: 500 })
  }
}