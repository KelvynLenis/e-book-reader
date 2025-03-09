import type { z } from 'zod'
import type bookSchema from './bookSchema'
import type folderSchema from './folderSchema'

export type BookType = z.infer<typeof bookSchema>
export type FolderType = z.infer<typeof folderSchema>
