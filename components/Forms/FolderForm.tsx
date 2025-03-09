'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { ID, databases, storage } from '@/lib/appwrite'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Name is required.',
  }),
  folderId: z.string().optional(),
})

export function FolderForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      folderId: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const folderCreated = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_FOLDERS_COLLECTION_ID,
        ID.unique(),
        {
          title: values.title,
          parent_id: values.folderId,
        }
      )
      router.push('/my-books')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex bg-zinc-800 w-full items-center justify-center pl-2 rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 justify-center flex flex-col"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel>Folder name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-200 text-zinc-950"
                    type="text"
                    placeholder="File name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="folderId"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel>Folder</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full bg-zinc-200 text-zinc-950">
                      <SelectValue placeholder="Folder" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="/">/</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="self-center bg-blue-500 hover:bg-blue-700 cursor-pointer"
          >
            Create
          </Button>
        </form>
      </Form>
    </div>
  )
}
