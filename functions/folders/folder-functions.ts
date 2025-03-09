import { databases } from '@/lib/appwrite'
import type { FolderType } from '@/types'

export const getFolders = async (): Promise<FolderType[]> => {
  const foldersResponse = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_FOLDERS_COLLECTION_ID!
  )

  return foldersResponse.documents as FolderType[]
}

export const addBookToFolder = async (folderId: string) => {
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
      books: [...folder.books, folder.title],
    }
  )

  return updatedFolder
}
