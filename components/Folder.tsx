import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Folder as FolderIcon, Pencil, Trash } from 'lucide-react'
import { Book } from './Book'
import { Button } from './ui/button'

interface FolderProps {
  title: string
  children?: React.ReactNode
}

export function Folder({ title, children }: FolderProps) {
  return (
    <div className="relative flex w-full">
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-md px-2 py-1 hover:bg-blue-900"
      >
        <AccordionItem value="item-1" className="gap-2 flex flex-col">
          <AccordionTrigger className="text-xl cursor-pointer hover:text-blue-200 flex items-center p-2 w-96">
            <div className="flex items-center">
              <FolderIcon className="mr-2" />
              {title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="rounded-md pl-6">
            {children}
            {/* <Book /> */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex flex-col items-start gap-2">
        <Button className="cursor-pointer text-amber-400 hover:text-amber-300 p-0 h-fit">
          <Pencil />
          Rename
        </Button>
        <Button className="cursor-pointer text-red-500 hover:text-red-400 p-0 h-fit">
          <Trash />
          Delete
        </Button>
      </div>
    </div>
  )
}
