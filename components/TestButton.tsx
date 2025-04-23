'use client'

import { patchBook } from '@/functions/books/test-book'
import type { BookType } from '@/types'

export function TestButton({ book }: { book: BookType }) {
  // function handleUpdate() {
  //   console.log(book)
  //   fetch(`http://localhost:3000/api/update-book`, {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       documentId: book.$id,
  //       title: 'U Book',
  //     }),
  //   })
  // }

  return (
    <>
      <button
        type="button"
        // onClick={handleUpdate}
        onClick={() => patchBook({ documentId: book.$id, title: 'RE Book' })}
        className="bg-blue-500 rounded-lg cursor-pointer p-2"
      >
        Update Book
      </button>
    </>
  )
}
