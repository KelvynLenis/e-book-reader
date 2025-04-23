import { env } from '@/env'
import { Tags } from 'lucide-react'
import { NextResponse } from 'next/server'

export async function GET() {
  const url = `https://cloud.appwrite.io/v1/databases/${process.env.NEXT_PUBLIC_DATABASE_ID}/collections/${process.env.NEXT_PUBLIC_BOOKS_COLLECTION_ID}/documents`

  try {
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
    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Erro ao buscar livros:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
