import { databases, storage } from '@/lib/appwrite'
import type { BookType } from '@/types'
import { ID, type Models, Query } from 'appwrite'
import { addBookToFolder } from '../folders/folder-functions'

interface createBookValuesProps {
  values: {
    title: string
    totalPages?: number | undefined
    folderId?: string | undefined
    file?: any
  }
  fileCreatedId: string
}

export const createBook = async ({
  values,
  fileCreatedId,
}: createBookValuesProps): Promise<Models.Document> => {
  const fileCreated = await storage.createFile(
    process.env.NEXT_PUBLIC_BOOKS_BUCKET_ID!,
    ID.unique(),
    document.getElementById('uploader')!.files[0]
  )

  fileCreatedId = fileCreated.$id

  const createdBook = await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
    ID.unique(),
    {
      title: values.title,
      type: fileCreated.mimeType.split('/')[1],
      current_page: 1,
      total_pages: values.totalPages,
      folder_id: values.folderId,
      slug: values.title.toLowerCase().replace(/ /g, '-'),
      file_url: '',
    }
  )

  return createdBook
}

export const listBooks = async (): Promise<BookType[]> => {
  const createdBook = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
    [Query.equal('folder_id', '/')]
  )

  return createdBook.documents as BookType[]
}
