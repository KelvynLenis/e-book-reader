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
      file_url: `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BOOKS_BUCKET_ID}/files/${fileCreatedId}/view?project=${process.env.NEXT_PUBLIC_APP_WRITE_PROJECT_ID}&mode=admin`,
      file_id: fileCreatedId,
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

export const deleteBook = async (
  bookId: string,
  fileId: string
): Promise<void> => {
  await databases.deleteDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
    bookId
  )

  await storage.deleteFile(process.env.NEXT_PUBLIC_BOOKS_BUCKET_ID!, fileId)
}

export const getBook = async (id: string): Promise<BookType> => {
  const result = await databases.getDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
    id
  )

  return result as BookType
}

export const updateBook = async (book: BookType): Promise<BookType> => {
  try {
    const result = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
      book.$id,
      {
        title: book.title,
        type: book.type,
        current_page: book.current_page,
        total_pages: book.total_pages,
        folder_id: book.folder_id,
        slug: book.slug,
        file_url: book.file_url,
        file_id: book.file_id,
        status: book.status,
        is_favourite: book.is_favourite,
      }
    )

    return result as BookType
  } catch (error) {
    console.log(error)
  }

  return {} as BookType
}
