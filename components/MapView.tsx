import { useEffect, useMemo, useRef, useState } from 'react'
import { Map, MapRef, Marker } from 'react-map-gl'
import archeomaps from 'data/archeomaps.json'
import { v4 as uuidv4 } from 'uuid'
import { DetailView } from './DetailView'
import { AnimatePresence } from 'framer-motion'
import { SetLocationProps } from 'pages'

export const INITIAL_LAT_LONG = [52.455, 5.69306]

export function MapView({ currentLocation, setCurrentLocation }: MapViewProps) {
  const data = archeomaps as unknown as Archeomaps

  const mapRef = useRef<MapRef | null>(null)

  const [[latitude, longitude], setLatLong] = useState<number[]>(INITIAL_LAT_LONG)

  useEffect(() => {
    const toZoom = currentLocation?.id ? 6 : 3

    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: toZoom, // reset to initial zoom when going back to overview
      duration: 2000,
    })
  }, [currentLocation, latitude, longitude])

  const points: Location[] = useMemo(() => {
    return data.features
      .map((loc) => {
        if (
          !loc?.geometry ||
          !loc?.geometry?.coordinates ||
          !loc?.geometry?.coordinates.length ||
          isNaN(loc.geometry.coordinates[0]) ||
          isNaN(loc.geometry.coordinates[1])
        ) {
          return false
        }

        return {
          id: uuidv4(),
          title: loc.properties.name,
          longitude: loc.geometry.coordinates[0],
          latitude: loc.geometry.coordinates[1],
        }
      })
      .filter(Boolean) as Location[]
  }, [data])

  function onLocationDetail(setLoc: Location) {
    setCurrentLocation(setLoc)
    setLatLong([setLoc.longitude, setLoc.longitude])
  }

  return (
    <>
      <AnimatePresence>
        {currentLocation && (
          <DetailView title={currentLocation.title} description={currentLocation.title} />
        )}
      </AnimatePresence>

      <Map
        ref={mapRef}
        initialViewState={{
          latitude: INITIAL_LAT_LONG[0],
          longitude: INITIAL_LAT_LONG[1],
          zoom: 3,
        }}
        style={{ position: 'absolute', zIndex: 80, top: 0, left: 0, right: 0, bottom: 0 }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {points.map((location) => {
          if (!location) return null

          return (
            <Marker
              key={location.id}
              longitude={location.longitude}
              latitude={location.latitude}
              style={{ position: 'absolute', left: 0, top: 0, cursor: 'pointer' }}
              onClick={() => onLocationDetail(location)}
            >
              <div className="h-2 w-2 rounded-lg bg-blue-200" />
            </Marker>
          )
        })}
      </Map>
    </>
  )
}

type MapViewProps = SetLocationProps

type Feature = {
  type: 'Feature'
  geometry: {
    type: 'Point'
    coordinates: [-64.6875, -71.746432]
  }
  properties: Record<string, null | string | number>
}

type Archeomaps = {
  name: 'Markers MP'
  type: 'FeatureCollection'
  features: Feature[]
}

export type Location = {
  id: string
  title: string
  longitude: number
  latitude: number
}
