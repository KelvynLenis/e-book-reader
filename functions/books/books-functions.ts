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

interface editBookValuesProps {
  values: {
    title: string
    totalPages?: number | undefined
    folderId?: string | undefined
    file?: any
  }
  book: BookType
  fileCreatedId: string
}

export const updateBook = async ({
  values,
  book,
  fileCreatedId,
}: editBookValuesProps): Promise<BookType> => {
  try {
    if (values.file) {
      const fileCreated = await storage.updateFile(
        process.env.NEXT_PUBLIC_BOOKS_BUCKET_ID!,
        book.file_id,
        document.getElementById('uploader')!.files[0]
      )

      fileCreatedId = fileCreated.$id

      const result = await databases.updateDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID!,
        process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
        book.$id,
        {
          title: values.title,
          type: fileCreated.mimeType.split('/')[1],
          folder_id: values.folderId,
          slug: values.title.toLowerCase().replace(/ /g, '-'),
          file_url: `https://cloud.appwrite.io/v1/storage/buckets/${process.env.NEXT_PUBLIC_BOOKS_BUCKET_ID}/files/${fileCreatedId}/view?project=${process.env.NEXT_PUBLIC_APP_WRITE_PROJECT_ID}&mode=admin`,
          file_id: fileCreatedId,
        }
      )

      return result as BookType
    }

    const result = await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
      book.$id,
      {
        title: values.title,
        folder_id: values.folderId,
        slug: values.title.toLowerCase().replace(/ /g, '-'),
      }
    )

    return result as BookType
  } catch (error) {
    console.log(error)
  }

  return {} as BookType
}
