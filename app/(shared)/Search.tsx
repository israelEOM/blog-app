import React, { useEffect, useRef, useState } from 'react'
import { prisma } from '@/app/api/client'
import Turnstone from 'turnstone'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  item: {
    title: string,
    id: string
  }
}

const Item = ({ item }: Props) => {
  return (
    <div className='flex items-center cursor-pointer px-5 py-4'>
      <p>{item.title}</p>
    </div>
  )
}

const styles = {
  input: 'w-full border border-wh-500 py-2 px-4 text-lg bg-wh-900 text-white placeholder:text-wh-500 outline-none rounded-none',
  listbox: 'bg-neutral-900 w-full text-slate-50 rounded-md',
  highlightedItem: 'bg-neutral-800',
  query: 'text-oldsilver-800 placeholder:text-slate-600',
  typeahead: 'text-slate-500',
  clearButton: 'absolute inset-y-0 text-lg right-0 w-10 inline-flex items-center justify-center bg-netural-700 hover:text-wh-200',
  noItems: 'cursor-default text-center my-20',
  match: 'font-semibold',
  groupHeading: 'px-5 py-3 text-pink-500',
}

const listbox = {
  displayField: 'title',
  data: async (query: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/post/${query}`,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
    const data = await res.json()
    return data
  },
  searchType: 'contains',
}

const Search = () => {
  const router = useRouter()
  const turnstoneRef = useRef()

  const handleQuery = (post: any) => {
    if (post) router.push(`/post/${post?.id}`)
  }
  
  return (
    <div className='flex gap-1 items-end'>
      <div>
        <span className='text-wh-900 font-semibold'>SEARCH THE SITE</span>
        <Turnstone
          ref={turnstoneRef}
          id='search'
          name='search'
          autoFocus={true}
          typeahead={true}
          clearButton={true}
          debounceWait={250}
          listboxIsImmutable={true}
          maxItems={5}
          noItemsMessage="We couldn't find any character that matches your search"
          placeholder='Enter Keyword'
          listbox={listbox}
          styles={styles}
          onSelect={handleQuery}
          // Item={Item}
        />
      </div>
      <button
        type="button"
        // onClick={handleQuery}
        className="bg-accent-red hover:bg-wh-500 text-wh-10 font-semibold py-2 px-5 h-[2.8rem]"
      >
        SEARCH
      </button>
    </div>
  )
}

export default Search