'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { getDocument } from 'pdfjs-dist'
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
import { toast } from 'react-toastify'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'

import { createBook } from '@/functions/books/books-functions'
import {
  addBookToFolder,
  getFolders,
} from '@/functions/folders/folder-functions'
import type { BookType, FolderType } from '@/types'
import { GlobalWorkerOptions } from 'pdfjs-dist'
import { useEffect, useState } from 'react'

GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.mjs'

const formSchema = z.object({
  file: z.any(),
  title: z.string().min(1, {
    message: 'Name is required.',
  }),
  folderId: z.string().optional(),
  totalPages: z.number().optional(),
})

interface BookFormProps {
  closeSheet: () => void
  book?: BookType
}

export function BookForm({ closeSheet, book }: BookFormProps) {
  const [folders, setFolders] = useState<FolderType[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: '',
      title: book ? book.title : '',
      folderId: book ? book.folder_id : '/',
    },
  })

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const fileName = file.name.replace(/\.[^/.]+$/, '')
      form.setValue('title', fileName)

      const pageCount = await getPageCount(file)

      console.log(pageCount)
      form.setValue('totalPages', pageCount)
    }
  }

  async function getPageCount(file: File): Promise<number> {
    if (file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await getDocument({ data: arrayBuffer }).promise

      console.log(pdf)
      return pdf.numPages
    }
    return 0 // Default for non-PDF files
  }

  const fileCreatedId = ''

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const createBookAndFolder = async () => {
        await createBook({ values, fileCreatedId })
        values.folderId !== '/' && (await addBookToFolder(values.folderId!))
      }

      toast.promise(createBookAndFolder, {
        pending: 'Uploading book...',
        success: 'Book uploaded successfully',
        error: 'Error Uploading book',
      })

      closeSheet()
    } catch (error) {
      fileCreatedId &&
        (await storage.deleteFile(
          process.env.NEXT_PUBLIC_BOOKS_BUCKET_ID!,
          fileCreatedId
        ))

      console.error(error)
    }
  }

  useEffect(() => {
    const foldersResponse = getFolders()

    foldersResponse.then(folders => {
      setFolders(folders)
    })
  }, [])

  return (
    <div className="flex bg-zinc-800 w-full items-center justify-center pl-2 rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 justify-center flex flex-col"
        >
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel>File</FormLabel>
                <FormControl>
                  <Input
                    id="uploader"
                    className="bg-zinc-200 text-zinc-950"
                    type="file"
                    // placeholder="Choose a file"
                    {...field}
                    onChange={e => {
                      field.onChange(e)
                      handleFileChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel>File name</FormLabel>
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
                    {folders.map(folder => (
                      <SelectItem key={folder.$id} value={folder.$id}>
                        {folder.title}
                      </SelectItem>
                    ))}
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
            Upload
          </Button>
        </form>
      </Form>
    </div>
  )
}
