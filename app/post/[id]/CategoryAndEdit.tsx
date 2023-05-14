import { FormattedPost } from "@/app/types"
import { Editor } from "@tiptap/react"
import React from "react"
import { XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/solid"

type Props = {
  isEditable: boolean
  handleIsEditable: (isEditable: boolean) => void
  category: string
  setCategory: (title: string) => void
  categoryError: string
  title: string
  setTitle: (title: string) => void
  tempCategory: string
  setTempCategory: (tempTitle: string) => void
  handleOnChangeCategory: (e: React.ChangeEvent<HTMLInputElement>) => void
  tempTitle: string
  setTempTitle: (tempTitle: string) => void
  tempContent: string
  setTempContent: (tempContent: string) => void
  editor: Editor | null
  post?: FormattedPost
}

const CategoryAndEdit = ({
  isEditable,
  handleIsEditable,
  category,
  setCategory,
  categoryError,
  title,
  setTitle,
  tempCategory,
  setTempCategory,
  handleOnChangeCategory,
  tempTitle,
  setTempTitle,
  tempContent,
  setTempContent,
  editor,
  post,
}: Props) => {

  const handleEnableEdit = () => {
    handleIsEditable(!isEditable)
    setTempCategory(category)
    setTempTitle(title)
    setTempContent(editor?.getHTML() || "")
  }

  const handleCancelEdit = () => {
    handleIsEditable(!isEditable)
    setCategory(tempCategory)
    setTitle(tempTitle)
    editor?.commands.setContent(tempContent)
  }

  return (
    <div className="flex justify-between items-center">
      <h4 className="bg-accent-orange py-2 px-5 tex-wh-900 text-sm font-bold">
          {isEditable ? (
            <div>
              <input
                type='text'
                className="bg-transparent focus:outline-none"
                placeholder="Category"
                onChange={handleOnChangeCategory}
                value={category}
              />
              {categoryError && (
                <p className="mt-1 text-primary-500">{categoryError}</p>
              )}
            </div>
          ) : (
            <>{post?.category}</>
          )}
        
      </h4>
      <div className="mt-4">
        {isEditable ? (
          <div className="flex justify-between gap-3">
            <button onClick={handleCancelEdit}>
              <XMarkIcon className="h-6 w-6 text-accent-red" />
            </button>
          </div>
        ) : (
          <button onClick={handleEnableEdit}>
            <PencilSquareIcon className="h-6 w-6 text-accent-red" />
          </button>
        )}
      </div>
    </div>
  )
}

export default CategoryAndEdit