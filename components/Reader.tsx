'use client'
import { useState } from 'react'
import { ReactReader } from 'react-reader'

interface ReaderPDFProps {
  fileURL: string
}

export function Reader({ fileURL }: ReaderPDFProps) {
  const [location, setLocation] = useState<string | number>(0)

  return (
    <div className="w-[80%] h-[90%]">
      <ReactReader
        url={fileURL}
        epubInitOptions={{
          openAs: 'epub',
        }}
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
      />
    </div>
  )
}
