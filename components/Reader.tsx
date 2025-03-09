'use client'
import { useState } from 'react'
import { ReactReader } from 'react-reader'

export function Reader() {
  const [location, setLocation] = useState<string | number>(0)

  return (
    <div className="w-[80%] h-[90%]">
      <ReactReader
        url="/sample2.epub"
        epubInitOptions={{
          openAs: 'epub',
        }}
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
      />
    </div>
  )
}
