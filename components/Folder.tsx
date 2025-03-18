import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getBook } from '@/functions/books/books-functions'
import {
  deleteFolder,
  getFolder,
  updateFolder,
} from '@/functions/folders/folder-functions'
import { cn } from '@/lib/utils'
import type { BookType, FolderType } from '@/types'
import {
  CircleEllipsis,
  Ellipsis,
  Folder as FolderIcon,
  Pencil,
  Save,
  Trash,
  Triangle,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Book } from './Book'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface FolderProps {
  folder: FolderType
  children?: React.ReactNode
}

export function Folder({ folder, children }: FolderProps) {
  const [isEditInputOpen, setIsEditInputOpen] = useState(false)
  const [title, setTitle] = useState(folder.title)
  const [subFolders, setSubFolders] = useState<FolderType[]>([])
  const [books, setBooks] = useState<BookType[]>([])

  async function handleRenameFolder() {
    toast.promise(updateFolder({ ...folder, title }), {
      pending: 'Renaming folder...',
      success: 'Folder renamed successfully!',
      error: 'Error renaming folder!',
    })

    setIsEditInputOpen(false)
  }

  async function handleDeleteFolder() {
    toast.promise(deleteFolder(folder.$id), {
      pending: 'Deleting folder...',
      success: 'Folder deleted successfully!',
      error: 'Error deleting folder!',
    })
  }

  useEffect(() => {
    const getSubfolders = async () => {
      if (folder.folders_id.length > 0) {
        for (let i = 0; i < folder.folders_id.length; i++) {
          const subFolder = await getFolder(folder.folders_id[i])

          subFolders.push(subFolder)

          const sortedFolders = subFolders.sort((a, b) =>
            a.title.localeCompare(b.title)
          )

          setSubFolders(sortedFolders)
        }
      }
    }

    const getBooks = async () => {
      if (folder.books_id.length > 0) {
        for (let i = 0; i < folder.books_id.length; i++) {
          const book = await getBook(folder.books_id[i])

          books.push(book)

          const sortedBooks = books.sort((a, b) =>
            a.title.localeCompare(b.title)
          )
          setBooks(sortedBooks)
        }
      }
    }

    getSubfolders()
    getBooks()
  }, [])

  return (
    <div className="relative flex w-full">
      {isEditInputOpen ? (
        <>
          <FolderIcon className="ml-4 mr-2 self-center" size={32} />
          <Input
            type="text"
            className="bg-zinc-800 self-center"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <div className="flex flex-col items-start gap-2 ml-2 -mr-4">
            <Button
              onClick={handleRenameFolder}
              className="cursor-pointer text-white bg-green-500 hover:text-green-300 p-1 w-full h-fit"
            >
              <Save />
              Save
            </Button>
            <Button
              onClick={() => setIsEditInputOpen(false)}
              className="cursor-pointer text-white bg-red-500 hover:text-red-400 p-1 h-fit"
            >
              <Trash />
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <Accordion
            type="single"
            collapsible
            className="w-full rounded-md px-2 py-1 hover:bg-blue-900"
          >
            <AccordionItem value="item-1" className="gap-2 flex flex-col">
              <AccordionTrigger className="text-xl cursor-pointer hover:text-blue-200 flex items-center p-2 w-96">
                <div className="flex items-center">
                  <FolderIcon className="mr-2" />
                  {folder.title}
                </div>
              </AccordionTrigger>
              <AccordionContent className="rounded-md pl-6">
                {subFolders.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {subFolders.map(subFolder => (
                      <Folder key={subFolder.$id} folder={subFolder} />
                    ))}
                  </div>
                )}

                {books.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {books.length > 0 ? (
                      books.map(book => <Book key={book.$id} book={book} />)
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <FolderIcon className="mr-2" />
                          <p className="text-zinc-300">
                            No books in this folder
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Popover>
            <PopoverTrigger className="cursor-pointer">
              <CircleEllipsis className="ml-2 hover:fill-zinc-400 transition-all duration-300 ease-in" />
            </PopoverTrigger>
            <PopoverContent className="w-fit bg-zinc-100 p-2">
              <Triangle className="h-7 w-7 fill-zinc-100 text-zinc-100 absolute -top-5 left-[40%]" />
              <div className="flex flex-col items-start gap-2 w-fit">
                <Button
                  onClick={() => setIsEditInputOpen(true)}
                  className="cursor-pointer text-white bg-amber-500 p-2 hover:text-amber-300 h-fit"
                >
                  <Pencil />
                  Rename
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="cursor-pointer bg-red-500 text-white p-2 hover:text-red-400 w-full h-fit">
                      <Trash />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-zinc-900">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-700"
                        onClick={handleDeleteFolder}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}
    </div>
  )
}
