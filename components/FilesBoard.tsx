'use client'

import {
  deleteBook,
  listBooks,
  updateBook,
} from '@/functions/books/books-functions'
import { getFolders } from '@/functions/folders/folder-functions'
import type { BookType, FolderType } from '@/types'
import {
  BookCheck,
  BookHeart,
  BookMarked,
  BookOpen,
  Bookmark,
  Heart,
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Book } from './Book'
import { Folder } from './Folder'
import { Button } from './ui/button'

export function FilesBoard() {
  const [folders, setFolders] = useState<FolderType[]>([])
  const [books, setBooks] = useState<BookType[]>([])
  const [isBookDetailsOpen, setIsBookDetailsOpen] = useState(false)
  const [bookDetails, setBookDetails] = useState<BookType>({} as BookType)

  function handleOpenBookDetails(book: BookType) {
    if (book.title === bookDetails.title) {
      setIsBookDetailsOpen(false)
      setBookDetails({} as BookType)
      return
    }

    setIsBookDetailsOpen(true)
    setBookDetails(book)
  }

  function handleDeleteBook() {
    toast.promise(deleteBook(bookDetails.$id, bookDetails.file_id), {
      pending: 'Deleting book...',
      success: 'Book deleted successfully!',
      error: 'Error deleting book!',
    })
  }

  function handleUpdate({
    status,
    isFavourite,
  }: { status?: string; isFavourite?: boolean }) {
    if (status) {
      toast.promise(
        updateBook({
          ...bookDetails,
          status: status === 'unread' ? 'read' : status,
        }),
        {
          pending: `Marking as ${status}...`,
          success: 'Book updated successfully!',
          error: 'Error updating book!',
        }
      )
      return
    }

    if (isFavourite) {
      console.log('isFavourite', isFavourite)
      toast.promise(
        updateBook({ ...bookDetails, is_favourite: !isFavourite }),
        {
          pending: 'Marking as favourite...',
          success: 'Book updated successfully!',
          error: 'Error updating book!',
        }
      )
      return
    }

    toast.promise(updateBook({ ...bookDetails }), {
      pending: 'Updating book...',
      success: 'Book updated successfully!',
      error: 'Error updating book!',
    })
  }

  useEffect(() => {
    const foldersResponse = getFolders()

    foldersResponse.then(folders => {
      setFolders(folders)
    })

    const booksReponse = listBooks()

    booksReponse.then(book => {
      console.log(book)
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
            <div className="w-56 h-64 group relative flex bg-zinc-700 hover:bg-zinc-800 self-center items-center justify-center rounded-sm transition-colors duration-300 ease-in">
              <BookOpen size={100} className="text-zinc-500" />
              {bookDetails.status === 'reading' && (
                <Bookmark
                  size={30}
                  className="absolute group-hover:opacity-50 -top-1 right-4 text-yellow-400 fill-yellow-400 transition-colors duration-300 ease-in"
                />
              )}
              {bookDetails.is_favourite && (
                <Heart
                  size={30}
                  className="absolute group-hover:opacity-50 bottom-1 left-3 text-red-500 fill-red-500 transition-colors duration-300 ease-in"
                />
              )}
            </div>
            <div className="flex gap-2 self-center">
              <Link href={`/my-books/${bookDetails.$id}`}>
                <Button className="cursor-pointer group bg-blue-500 hover:bg-white hover:text-blue-500 transition-colors duration-200 ease-in">
                  <BookOpen className="text-white group-hover:text-blue-500 transition-colors duration-200 ease-in" />
                  View
                </Button>
              </Link>
              <Button
                onClick={() => handleUpdate({ status: 'read' })}
                className="cursor-pointer group bg-green-400 hover:bg-white hover:text-green-400 transition-colors duration-200 ease-in"
              >
                <BookCheck className="text-white group-hover:text-green-400 transition-colors duration-200 ease-in" />
                Mark as read
              </Button>
              <Button
                onClick={() =>
                  handleUpdate({
                    status:
                      bookDetails.status === 'reading' ? 'unread' : 'reading',
                  })
                }
                className="cursor-pointer group bg-amber-400 hover:bg-white hover:text-amber-400 transition-colors duration-200 ease-in"
              >
                <BookMarked className="text-white group-hover:text-amber-400 transition-colors duration-200 ease-in" />
                Mark as reading
              </Button>
              <Button
                onClick={() =>
                  handleUpdate({ isFavourite: !bookDetails.is_favourite })
                }
                className="cursor-pointer group bg-red-400 hover:bg-white hover:text-red-400 transition-colors duration-200 ease-in"
              >
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

                <Button
                  onClick={handleDeleteBook}
                  className="bg-red-500 hover:bg-red-500 hover:opacity-50 cursor-pointer transition-colors duration-200 ease-in"
                >
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
