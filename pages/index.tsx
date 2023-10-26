import { Header } from '@/components/Header'
import { type Location, MapView } from '@/components/MapView'
import { useState } from 'react'
import { isClient } from '@/utils/isClient'

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)

  if (isClient) {
    document?.body.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setCurrentLocation(null)
    })
  }

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header {...{ currentLocation, setCurrentLocation }} />
      <section className="relative mb-auto h-[calc(100vh-97px)] overflow-x-clip overflow-y-clip hover:cursor-auto">
        <MapView {...{ currentLocation, setCurrentLocation }} />
      </section>
    </div>
  )
}

export type SetLocationProps = {
  currentLocation: Location | null
  setCurrentLocation: (loc: Location | null) => void
}
