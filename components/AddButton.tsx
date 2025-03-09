import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from './ui/button'

interface AddButtonProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export function AddButton({ title, description, icon }: AddButtonProps) {
  return (
    <>
      <Sheet>
        <SheetTrigger>
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
        </SheetContent>
      </Sheet>
    </>
  )
}
