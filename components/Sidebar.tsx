import { Bars } from './icons/Bars'
import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react'
import clsx from 'clsx'
import { Config } from '@/utils/useConfig'
import { Select } from './form/Select'
import { mapStyles } from '@/data/mapStyles'

export const Sidebar = ({ config, setConfig }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const mapStyleOptions = mapStyles.map((mapStyle) => ({
    label: mapStyle.name,
    value: mapStyle.url,
  }))

  const handleMapStyleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const mapStyle = mapStyles.find((mapStyle) => mapStyle.url === e.target.value)
    if (mapStyle) {
      setConfig({ ...config, mapStyle })
    }
  }

  return (
    <>
      <aside
        className={clsx(
          'absolute z-40 h-full w-full bg-gray-900 px-6 transition-all duration-300 md:w-1/2 lg:w-1/3',
          isOpen ? 'right-0' : '-right-full'
        )}
      >
        <h2 className="mb-4 text-xl">Configuration</h2>
        <Select
          label="Map Style"
          options={mapStyleOptions}
          value={config.mapStyle.url}
          onChange={handleMapStyleChange}
        />
        <button
          className="py-4 text-white opacity-70 transition-opacity hover:opacity-100"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </aside>
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

type Props = {
  config: Config
  setConfig: Dispatch<SetStateAction<Config>>
}
