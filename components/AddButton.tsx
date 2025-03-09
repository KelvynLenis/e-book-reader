'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { BookType, FolderType } from '@/types'
import { Label } from '@radix-ui/react-label'
import { useState } from 'react'
import { BookForm } from './Forms/BookForm'
import { FolderForm } from './Forms/FolderForm'
import { Button } from './ui/button'
import { Input } from './ui/input'

interface AddButtonProps {
  title: string
  description?: string
  icon?: React.ReactNode
  type: 'book' | 'folder'
  book?: BookType
  folder?: FolderType
}

export function AddButton({
  title,
  description,
  icon,
  type,
  book,
  folder,
}: AddButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="bg-blue-500 hover:bg-blue-400 cursor-pointer transition-colors duration-200 ease-in">
            {icon}
            {title}
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-zinc-800 text-zinc-50">
          <SheetHeader>
            <SheetTitle className="text-zinc-50 font-bold text-xl">
              {title}
            </SheetTitle>
            <SheetDescription className="text-zinc-400 font-medium">
              {description}
            </SheetDescription>
          </SheetHeader>

          {type === 'book' ? (
            <BookForm closeSheet={() => setIsOpen(false)} book={book} />
          ) : (
            <FolderForm closeSheet={() => setIsOpen(false)} folder={folder} />
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}
