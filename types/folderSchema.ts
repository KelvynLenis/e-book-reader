import { z } from 'zod'

const folderSchema = z.object({
  $collectionId: z.string(),
  $createdAt: z.string().datetime(),
  $databaseId: z.string(),
  $id: z.string(),
  $permissions: z.array(z.string()),
  $updatedAt: z.string().datetime(),
  books_id: z.array(z.string()),
  folders_id: z.array(z.string()),
  isFolder: z.boolean(),
  parent_id: z.string(),
  title: z.string(),
})

export default folderSchema
