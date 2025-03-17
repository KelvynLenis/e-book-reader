import { Reader } from '@/components/Reader'
import { ReaderPDF } from '@/components/ReaderPDF'
import { getBook } from '@/functions/books/books-functions'

export default async function Read({ params }: { params: { id: string } }) {
  const { id } = await params

  const book = await getBook(id)

  return (
    <div className="flex items-center justify-center px-20 py-5 h-full w-full">
      <Reader fileURL={book.file_url!} />
      {/* <ReaderPDF fileURL={book.file_url!} /> */}
    </div>
  )
}
