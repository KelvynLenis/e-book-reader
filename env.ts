import z from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_APP_WRITE_PROJECT_ID: z.string(),
  NEXT_PUBLIC_DATABASE_ID: z.string(),
  NEXT_PUBLIC_BOOKS_BUCKET_ID: z.string(),
  NEXT_PUBLIC_BOOKS_COLLECTION_ID: z.string(),
  NEXT_PUBLIC_FOLDERS_COLLECTION_ID: z.string(),
  NEXT_PUBLIC_USERS_COLLECTION_ID: z.string(),
  APPWRITE_API_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
