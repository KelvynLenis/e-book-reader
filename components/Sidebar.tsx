'use client'

import { account } from '@/lib/appwrite'
import { Book, BookCheck, BookHeart, BookMarked } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

export function Sidebar() {
  const [name, setName] = useState('')
  function handleLogout() {
    account.deleteSession('current')
  }

  useEffect(() => {
    async function checkUserAuthentication() {
      const user = await account.get()
      setName(user.name)
    }

    checkUserAuthentication()
  }, [])

  return (
    <>
      <div className="w-[15%] bg-zinc-800 flex flex-col items-center py-5 px-3 gap-4 shadow-md shadow-zinc-500">
        <div className="flex flex-col gap-2 items-center">
          <span className="w-18 h-18 flex items-center justify-center text-5xl font-semibold rounded-full bg-blue-500">
            {name[0]}
          </span>
          <span>{name}</span>
        </div>

        <span className="w-full h-0.5 bg-zinc-600 opacity-40 rounded-full" />

        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-5">
            <Link href={'/my-books'}>
              <span className="w-32 flex gap-1 hover:text-blue-400 cursor-pointer transition-colors duration-200 ease-out">
                <Book className="text-blue-400" />
                All
              </span>
            </Link>
            <span className="w-32 flex gap-1 hover:text-green-400 cursor-pointer transition-colors duration-200 ease-out">
              <BookCheck className="text-green-400" />
              Read
            </span>
            <span className="w-32 flex gap-1 hover:text-amber-400 cursor-pointer transition-colors duration-200 ease-out">
              <BookMarked className="text-amber-400" />
              Reading
            </span>
            <span className="w-32 flex gap-1 hover:text-red-400 cursor-pointer transition-colors duration-200 ease-out">
              <BookHeart className="text-red-400" />
              Favourites
            </span>
          </div>

          <Button
            onClick={handleLogout}
            className="cursor-pointer bg-red-500 hover:bg-white hover:text-red-500 transition-colors duration-200 ease-in"
          >
            Sair
          </Button>
        </div>
      </div>
    </>
  )
}
