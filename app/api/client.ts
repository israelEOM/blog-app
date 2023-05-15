import { PrismaClient } from "@prisma/client"

let prismaInit: PrismaClient

if (process.env.NODE_ENV === "production") {
  prismaInit = new PrismaClient()
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient()
  }
  prismaInit = (global as any).prisma
}

export const prisma = prismaInit

export async function removeTags(str: string) {
  if ((str === null) || (str === ''))
    return ''
  else
    str = str.toString()

  return str.replace(/(<([^>]+)>)/ig, '')
}