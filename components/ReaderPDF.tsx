'use client'

import { useState } from 'react'
import { Document, Page } from 'react-pdf'
import { pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import { BookCheck, Bookmark, BookmarkCheck, Heart } from 'lucide-react'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

export function ReaderPDF() {
  const [numPages, setNumPages] = useState<number>()

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
  }

  return (
    <>
      <div className="w-fit h-[95%] overflow-x-hidden relative">
        <Document
          className="p-0"
          file="/sample.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
      <div className="absolute w-32 flex gap-2 rounded-md p-4 top-5 right-60">
        <BookmarkCheck className="text-green-400 hover:fill-green-400 hover:text-green-100 cursor-pointer" />
        <Bookmark className="text-amber-400 hover:fill-amber-400 cursor-pointer" />
        <Heart className="text-red-400 hover:fill-red-400 cursor-pointer" />
      </div>
    </>
  )
}
