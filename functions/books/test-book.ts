'use server'

import { env } from '@/env'
import type { BookType } from '@/types'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function getAllBooks(): Promise<BookType[]> {
  'use server'
  const res = await fetch(
    `https://cloud.appwrite.io/v1/databases/${env.NEXT_PUBLIC_DATABASE_ID}/collections/${env.NEXT_PUBLIC_BOOKS_COLLECTION_ID}/documents`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': env.NEXT_PUBLIC_APP_WRITE_PROJECT_ID,
        'X-Appwrite-Key': env.APPWRITE_API_KEY,
      },
      next: {
        tags: ['books'],
      },
    }
  )

  if (!res.ok) {
    console.log('Response:', res)
    throw new Error(`Erro ao buscar livros: ${res.statusText}`)
  }

  const data = await res.json()
  return data
}

export async function patchBook({
  documentId,
  title,
}: { documentId: string; title: string }) {
  try {
    const res = await fetch(
      `https://cloud.appwrite.io/v1/databases/${env.NEXT_PUBLIC_DATABASE_ID}/collections/${env.NEXT_PUBLIC_BOOKS_COLLECTION_ID}/documents/${documentId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Project': env.NEXT_PUBLIC_APP_WRITE_PROJECT_ID,
        },
        body: JSON.stringify({
          data: {
            title,
          },
        }),
      }
    )

    if (!res.ok) {
      console.log('Response:', res)
      throw new Error(`Erro ao buscar livros: ${res.statusText}`)
    }

    revalidateTag('books')
    // revalidatePath('/my-books')

    console.log('update')

    const data = await res.json()
  } catch (error: any) {
    console.error('Erro ao buscar livros:', error)
  }
}
