'use server'

import { env } from '@/env'
import { revalidatePath, revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest) {
  const body = await req.json()
  console.log(body)
  const { documentId, title } = body

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
    revalidatePath('/my-books')

    console.log('update')

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Erro ao buscar livros:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
