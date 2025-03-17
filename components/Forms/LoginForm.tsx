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
import { account } from '@/lib/appwrite'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
})

export function LoginForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const session = await account.createEmailPasswordSession(
        values.email,
        values.password
      )

      if (!session) {
        throw new Error('Session creation failed.')
      }

      router.push('/my-books')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const autoLogin = async () => {
      const session = await account.get()
      if (session) {
        router.push('/my-books')
      }
    }

    toast.promise(autoLogin, {
      pending: 'Checking session...',
      success: 'Session found',
      error: 'Session not found',
    })
  }, [])

  return (
    <div className="flex bg-zinc-800 w-fit p-10 rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 justify-center flex flex-col"
        >
          <h1 className="text-4xl self-center">Sign in</h1>
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
          <Button
            type="submit"
            className="self-center bg-blue-500 hover:bg-blue-700 cursor-pointer"
          >
            Entrar
          </Button>

          <Link
            href={'/signup'}
            className="text-blue-500 hover:text-blue-400 self-center"
          >
            Sign up
          </Link>
        </form>
      </Form>
    </div>
  )
}
