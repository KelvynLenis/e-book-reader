'use client'

import { Button } from './ui/button'

interface BookProps extends React.HTMLAttributes<HTMLButtonElement> {
  title: string
  fileURL?: string
  folderId?: string
  slug?: string
  currentPage?: number
  totalPages?: number
  type?: string
}

export function Book({ title, ...props }: BookProps) {
  return (
    <>
      <Button
        {...props}
        className="justify-start cursor-pointer w-full text-lg bg-transparent rounded-md hover:bg-blue-900 hover:text-blue-200 py-1 pl-1 pr-5"
        type="button"
      >
        {title}
      </Button>
    </>
  )
}
