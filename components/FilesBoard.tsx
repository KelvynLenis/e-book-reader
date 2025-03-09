'use client'

import { listBooks } from '@/functions/books/books-functions'
import { getFolders } from '@/functions/folders/folder-functions'
import type { BookType, FolderType } from '@/types'
import { BookCheck, BookHeart, BookMarked, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Book } from './Book'
import { Folder } from './Folder'
import { Button } from './ui/button'

export function FilesBoard() {
  const [folders, setFolders] = useState<FolderType[]>([])
  const [books, setBooks] = useState<BookType[]>([])
  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false)
  const [bookDetails, setBookDetails] = useState<BookType>({} as BookType)

  function handleOpenBookDetails(book: BookType) {
    setIsBookDetailsOpen(true)
    setBookDetails(book)
  }

  useEffect(() => {
    const foldersResponse = getFolders()

    foldersResponse.then(folders => {
      setFolders(folders)
    })

    const booksReponse = listBooks()

    booksReponse.then(book => {
      setBooks(book)
    })
  }, [])

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col gap-1 w-1/2">
        {folders.map(folder => (
          <Folder key={folder.$id} title={folder.title} />
        ))}
        {books.map(book => (
          <Book
            key={book.$id}
            title={book.title}
            onClick={() => handleOpenBookDetails(book)}
          />
        ))}
      </div>

      <div className="flex flex-col w-1/2 h-full px-10 gap-3">
        {isBookDetailsOpen && (
          <>
            <div className="w-56 h-64 flex bg-zinc-700 hover:bg-zinc-800 self-center items-center justify-center rounded-sm transition-colors duration-300 ease-in">
              <BookOpen size={100} className="text-zinc-500" />
            </div>
            <div className="flex gap-2 self-center">
              <Button className="cursor-pointer group bg-blue-500 hover:bg-white hover:text-blue-500 transition-colors duration-200 ease-in">
                <BookOpen className="text-white group-hover:text-blue-500 transition-colors duration-200 ease-in" />
                View
              </Button>
              <Button className="cursor-pointer group bg-green-400 hover:bg-white hover:text-green-400 transition-colors duration-200 ease-in">
                <BookCheck className="text-white group-hover:text-green-400 transition-colors duration-200 ease-in" />
                Mark as read
              </Button>
              <Button className="cursor-pointer group bg-amber-400 hover:bg-white hover:text-amber-400 transition-colors duration-200 ease-in">
                <BookMarked className="text-white group-hover:text-amber-400 transition-colors duration-200 ease-in" />
                Mark as reading
              </Button>
              <Button className="cursor-pointer group bg-red-400 hover:bg-white hover:text-red-400 transition-colors duration-200 ease-in">
                <BookHeart className="text-white group-hover:text-red-400 transition-colors duration-200 ease-in" />
                Mark as favourite
              </Button>
            </div>
            <div className="flex">
              <div className="flex flex-col w-full flex-wrap gap-1">
                <span className="text-lg font-bold">Title</span>
                <span className="italic text-zinc-400">
                  {bookDetails.title}
                </span>
                <span className="text-lg font-bold">Type</span>
                <span className="italic text-zinc-400 uppercase">
                  {bookDetails.type}
                </span>
                <span className="text-lg font-bold">Folder</span>
                <span className="italic text-zinc-400">Star Wars</span>
                <span className="self-center text-zinc-300 px-2 py-1 -mr-20 hover:bg-zinc-700 rounded-sm transition-colors duration-200 ease-in">
                  {bookDetails.current_page} /{' '}
                  {bookDetails.total_pages ? bookDetails.total_pages : '???'}
                </span>
              </div>
              <div className="flex flex-col flex-wrap gap-1">
                <Button className="bg-indigo-500 hover:bg-indigo-500 hover:opacity-50 cursor-pointer transition-colors duration-200 ease-in">
                  Editar
                </Button>

                <Button className="bg-red-500 hover:bg-red-500 hover:opacity-50 cursor-pointer transition-colors duration-200 ease-in">
                  Deletar
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
