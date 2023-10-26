import { Header } from '@/components/Header'
import { type Location, MapView } from '@/components/MapView'
import { useState } from 'react'

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header {...{ currentLocation, setCurrentLocation }} />
      <section className="relative mb-auto h-[calc(100vh-97px)] overflow-x-clip overflow-y-clip">
        <MapView {...{ currentLocation, setCurrentLocation }} />
      </section>
    </div>
  )
}

export type SetLocationProps = {
  currentLocation: Location | null
  setCurrentLocation: (loc: Location | null) => void
}
