'use server'

import { env } from '@/env'
import { getAllBooks } from '@/functions/books/test-book'
import type { BookType } from '@/types'
import { TestButton } from './TestButton'

export async function TestComponent() {
  // const res = await fetch('http://localhost:3000/api/list-books')
  // const res = await getAllBooks()
  // console.log(res)
  const data = await getAllBooks()
  console.log(data)

  return (
    <>
      <div className="flex flex-col gap-2">
        {data.documents.map((book: BookType) => (
          <div key={book.$id} className="flex items-center gap-2">
            <h1 className="w-32">{book.title}</h1>

            <TestButton book={book} />
          </div>
        ))}
      </div>
    </>
  )
}
