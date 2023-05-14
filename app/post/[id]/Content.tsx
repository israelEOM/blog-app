"use client"
import { FormattedPost } from "@/app/types"
import React, { useState } from "react"
import Image from "next/image"
import { Editor, EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import CategoryAndEdit from "./CategoryAndEdit"
import Article from "./Article"

type Props = {
  post?: FormattedPost
  actionUrl: string
  actionMethod: string
}

const Content = ({ post, actionUrl, actionMethod }: Props) => {
  const [isEditable, setIsEditable] = useState<boolean>(post ? false : true)

  const [category, setCategory] = useState<string>(post?.category || '')
  const [categoryError, setCategoryError] = useState<string>("")
  const [tempCategory, setTempCategory] = useState<string>(category)

  const [title, setTitle] = useState<string>(post?.title || '')
  const [titleError, setTitleError] = useState<string>("")
  const [tempTitle, setTempTitle] = useState<string>(title)

  const [content, setContent] = useState<string>(post?.content || '')
  const [contentError, setContentError] = useState<string>("")
  const [tempContent, setTempContent] = useState<string>(content)

  const [author, setAuthor] = useState<string>('')
  const [image, setImage] = useState<string>('')

  const date = new Date(post?.createdAt || '')
  const options = { year: "numeric", month: "long", day: "numeric" } as any
  const formattedDate = date.toLocaleDateString("en-US", options)

  const handleIsEditable = (bool: boolean) => {
    setIsEditable(bool)
    editor?.setEditable(bool)
  }

  const handleOnChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (category) setCategoryError("")
    setCategory(e.target.value)
  }

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (title) setTitleError("")
    setTitle(e.target.value)
  }

  const handleOnChangeContent = ({ editor }: any) => {
    if (!(editor as Editor).isEmpty) setContentError("")
    setContent((editor as Editor).getHTML())
  }

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: handleOnChangeContent,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm xl:prose-2xl leading-8 focus:outline-none w-full max-w-full",
      },
    },
    content: content,
    editable: isEditable,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // validation checks
    if (category === "" ) setCategoryError("This field is required.")
    if (title === "") setTitleError("This field is required.")
    if (editor?.isEmpty) setContentError("This field is required.")
    if (category === "" || title === "" || editor?.isEmpty) return

    const response = await fetch(
      actionUrl,
      {
        method: actionMethod,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: category,
          title: title,
          content: content,
          author: author,
          image: image
        }),
      }
    )
    const data = await response.json()

    handleIsEditable(false)
    setTempCategory("")
    setTempTitle("")
    setTempContent("")
    setAuthor("")
    setImage("")

    setCategory(data.category)
    setTitle(data.title)
    setContent(data.content)
    setAuthor(data.author)
    setImage(data.image)
    editor?.commands.setContent(data.content)
  }

  return (
    <div className="prose w-full max-w-full mb-10">
      {/* BREADCRUMBS */}
      {post ? <h5 className="text-wh-300">{`Home > ${post.category} > ${post.title}`}</h5> : ''}

      {/* CATEGORY AND EDIT */}
      <CategoryAndEdit
        isEditable={isEditable}
        handleIsEditable={handleIsEditable}
        category={category}
        setCategory={setCategory}
        categoryError={categoryError}
        tempCategory={tempCategory}
        setTempCategory={setTempCategory}
        handleOnChangeCategory={handleOnChangeCategory}
        title={title}
        setTitle={setTitle}
        tempTitle={tempTitle}
        setTempTitle={setTempTitle}
        tempContent={tempContent}
        setTempContent={setTempContent}
        editor={editor}
        post={post}
      />

      <form onSubmit={handleSubmit}>
        {/* HEADER */}
        <>
          {isEditable ? (
            <div>
              <textarea
                className="border-2 rounded-md bg-wh-50 p-3 w-full"
                placeholder="Title"
                onChange={handleOnChangeTitle}
                value={title}
              />
              {titleError && (
                <p className="mt-1 text-primary-500">{titleError}</p>
              )}
            </div>
          ) : (
            <h3 className="font-bold text-3xl mt-3">{title}</h3>
          )}
          {post ? <div className="flex gap-3">
            <h5 className="font-semibold text-xs">By {post?.author}</h5>
            <h6 className="text-wh-300 text-xs">{formattedDate}</h6>
          </div> : ''}
        </>

        {/* IMAGE */}
        {post ? (<div className="relative w-auto mt-2 mb-16 h-96">
          <Image
            fill
            alt={post.title}
            src={post.image}
            sizes="(max-width: 480px) 100vw,
                  (max-width: 768px) 85vw,
                  (max-width: 1060px) 75vw,
                  60vw"
            style={{ objectFit: "cover" }}
          />
        </div>) : ''}

        {/* CREATE FIELDS */}
        {!post ? (
          <div className="flex gap-3 my-3">
            <input
              type='text'
              className="basis-1/3 border-2 rounded-md bg-wh-50 p-3 w-full"
              placeholder="Author"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
            <input
              type='text'
              className="basis-2/3 border-2 rounded-md bg-wh-50 p-3 w-full"
              placeholder="URL Image"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </div>
        ) : ''}

        {/* ARTICLE */}
        <Article
          contentError={contentError}
          editor={editor}
          isEditable={isEditable}
          content={content}
        />

        {/* SUBMIT BUTTON */}
        {isEditable && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-accent-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 mt-5"
            >
              SUBMIT
            </button>
          </div>
        )}
      </form>

    </div>
  )
}

export default Content