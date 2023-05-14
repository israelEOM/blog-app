import { NextResponse } from "next/server"
import { prisma } from "@/app/api/client"

export async function POST(request: Request, response: any) {
  try {
    const { category, title, content, author, image } = await request.json()
    const snippet = await removeTags(content)
    const post = await prisma.post.create({
      data: { category, title, content, author, image, snippet },
    })
    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.error("request error", error)
    NextResponse.json({ error: "error creating post" }, { status: 500 })
  }
}

export async function removeTags(str: string) {
  if ((str === null) || (str === ''))
    return ''
  else
    str = str.toString()

  return str.replace(/(<([^>]+)>)/ig, '')
}