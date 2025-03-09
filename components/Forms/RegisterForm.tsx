'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ID, account, databases } from '@/lib/appwrite'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Name is required.',
    }),
    email: z.string().email().min(1, {
      message: 'Email is required.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  })

export function RegisterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const accountCreated = await account.create(
        ID.unique(), // userId
        values.email, // email
        values.password, // password
        values.name // name (optional)
      )

      if (!accountCreated) {
        toast.error('Account creation failed.')
        throw new Error('Account creation failed.')
      }

      const documentCreated = await databases.createDocument(
        process.env.NEXT_PUBLIC_DATABASE_ID,
        process.env.NEXT_PUBLIC_USERS_COLLECTION_ID,
        ID.unique(),
        {
          name: values.name,
          email: values.email,
          user_id: accountCreated.$id,
        }
      )

      if (!documentCreated) {
        toast.error('Document creation failed.')
        throw new Error('Document creation failed.')
      }

      toast.success('Account created successfully.')

      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex bg-zinc-800 w-fit p-10 rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 justify-center flex flex-col"
        >
          <h1 className="text-4xl self-center">Sign up</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-200 text-zinc-950"
                    type="text"
                    placeholder="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-200 text-zinc-950"
                    type="email"
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-200 text-zinc-950"
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-64">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    className="bg-zinc-200 text-zinc-950"
                    type="password"
                    placeholder="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="self-center bg-blue-500 hover:bg-blue-700 cursor-pointer"
          >
            Sign up
          </Button>

          <Link
            href={'/signup'}
            className="text-blue-500 hover:text-blue-400 self-center"
          >
            Sign in
          </Link>
        </form>
      </Form>
    </div>
  )
}
