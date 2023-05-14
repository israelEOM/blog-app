import { Editor, EditorContent } from "@tiptap/react"
import React from "react"

type Props = {
  contentError: string
  content: string
  editor: Editor | null
  isEditable: boolean
}

const Article = ({
  contentError,
  content,
  editor,
  isEditable,
}: Props) => {

  if (!editor) {
    return null
  }

  return (
    <article className="text-wh-500 leading-8">
      <div
        className={
          isEditable ? "border-2 rounded-md bg-wh-50 p-3" : "w-full max-w-full"
        }
      >
        {!content ? <span className="text-gray-400">Content:</span> : ''}
        <EditorContent editor={editor} />
      </div>
      {contentError && <p className="mt-1 text-wh-900">{contentError}</p>}
    </article>
  )
}

export default Article