import { AddButton } from '@/components/AddButton'
import { FilesBoard } from '@/components/FilesBoard'
import { Folder } from '@/components/Folder'
import { BookPlus, FolderPlus } from 'lucide-react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col h-full w-full rounded-md gap-5 p-5">
        <h1 className="text-4xl">My Books</h1>

        <div className="flex gap-5">
          <AddButton
            type="book"
            title="Add Book"
            description="Add a book to your library, you can also select a folder to put it
              in."
            icon={<BookPlus />}
          />
          <AddButton
            type="folder"
            title="Add Folder"
            description="Create a folder to organize your library."
            icon={<FolderPlus />}
          />
        </div>

        <span className="w-full h-0.5 bg-zinc-600 opacity-60 rounded-full" />

        {children}
      </div>
    </>
  )
}
