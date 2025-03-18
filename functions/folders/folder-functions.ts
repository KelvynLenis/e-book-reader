import { databases } from '@/lib/appwrite'
import type { FolderType } from '@/types'

export const getFolders = async (): Promise<FolderType[]> => {
  const foldersResponse = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_FOLDERS_COLLECTION_ID!
  )

  return foldersResponse.documents as FolderType[]
}

export const addBookToFolder = async (bookId: string, folderId: string) => {
  const folder = await databases.getDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_FOLDERS_COLLECTION_ID!,
    folderId
  )

  const updatedFolder = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_FOLDERS_COLLECTION_ID!,
    folderId,
    {
      books_id: [...folder.books_id, folder.bookId],
    }
  )

  const updatedBook = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID!,
    bookId,
    {
      folder_id: folderId,
    }
  )

  return updatedFolder
}

export const deleteFolder = async (folderId: string) => {
  await databases.deleteDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_FOLDERS_COLLECTION_ID!,
    folderId
  )
}

export const updateFolder = async (folder: FolderType) => {
  const updatedFolder = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_FOLDERS_COLLECTION_ID!,
    folder.$id,
    {
      title: folder.title,
    }
  )

  return updatedFolder
}

export const createFolder = async (title: string) => {
  const createdFolder = await databases.createDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_FOLDERS_COLLECTION_ID!,
    ID.unique(),
    {
      title,
      books: [],
    }
  )

  return createdFolder
}

export const getFolder = async (folderId: string): Promise<FolderType> => {
  const folder = await databases.getDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_FOLDERS_COLLECTION_ID!,
    folderId
  )
  return folder
}

export const removeBookFromFolder = async (
  folderId: string,
  bookId: string
) => {
  const folder = await databases.getDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_FOLDERS_COLLECTION_ID!,
    folderId
  )

  const updatedFolder = await databases.updateDocument(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_FOLDERS_COLLECTION_ID!,
    folderId,
    {
      books: folder.books.filter((book: string) => book !== bookId),
    }
  )
  return updatedFolder
}
