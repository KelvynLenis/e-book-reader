import { z } from 'zod'

const bookSchema = z.object({
  $collectionId: z.string(),
  $createdAt: z.string().datetime(),
  $databaseId: z.string(),
  $id: z.string(),
  $permissions: z.array(z.string()),
  $updatedAt: z.string().datetime(),
  current_page: z.number(),
  file_url: z.string().nullable(),
  folder_id: z.string(),
  slug: z.string(),
  title: z.string(),
  total_pages: z.number().nullable(),
  type: z.string(),
})

export default bookSchema
