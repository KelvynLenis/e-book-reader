import { Reader } from '@/components/Reader'
import { ReaderPDF } from '@/components/ReaderPDF'

export default function Read() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      {/* <Reader /> */}
      <ReaderPDF />
    </div>
  )
}
