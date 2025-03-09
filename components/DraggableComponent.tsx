'use client'

import { useDragAndDrop } from '@formkit/drag-and-drop/react'
import type { ReactNode } from 'react'
import { Folder } from './Folder'

export function DraggableComponent() {
  const [parent, tapes] = useDragAndDrop<HTMLUListElement, ReactNode>([
    <Folder key={'folder-1'} title="Duran Duran" />,
    <Folder key={'folder-1'} title="Duran Duran" />,
    <Folder key={'folder-1'} title="Duran Duran" />,
    <Folder key={'folder-1'} title="Duran Duran" />,
  ])

  return (
    <>
      <ul ref={parent}>
        {tapes.map((tape, index) => (
          <li className="cassette" data-label={tape} key={index}>
            {tape}
          </li>
        ))}
      </ul>
    </>
  )
}
