import { Bars } from './icons/Bars'
import { useState } from 'react'
import clsx from 'clsx'

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  console.log(isOpen)
  return (
    <>
      <aside
        className={clsx(
          'absolute z-40 h-full w-1/3 bg-gray-900 transition-all duration-300',
          isOpen ? 'right-0' : '-right-full'
        )}
      ></aside>
      {isOpen && (
        <div
          role="presentation"
          className="absolute z-30 h-full w-full bg-gray-900 bg-opacity-40 transition-all duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <button
        className="absolute bottom-4 right-4 z-30 rounded bg-gray-900 bg-opacity-70 fill-white p-4 transition-all duration-200 hover:bg-opacity-100"
        onClick={() => setIsOpen(true)}
      >
        <Bars size="1.5em" />
      </button>
    </>
  )
}
