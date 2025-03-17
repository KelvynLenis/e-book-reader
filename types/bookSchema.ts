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
  file_id: z.string(),
  folder_id: z.string(),
  slug: z.string(),
  title: z.string(),
  status: z.string(),
  is_favourite: z.boolean(),
  total_pages: z.number().nullable(),
  type: z.string(),
})

export default bookSchema
