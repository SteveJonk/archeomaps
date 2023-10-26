import { useEffect, useMemo, useRef, useState } from 'react'
import { Map, MapRef, Marker } from 'react-map-gl'
import archeomaps from 'data/archeomaps.json'
import { v4 as uuidv4 } from 'uuid'
import { DetailView } from './DetailView'
import { AnimatePresence } from 'framer-motion'
import { SetLocationProps } from 'pages'
import { useRouter } from 'next/router'

export const INITIAL_LAT_LONG = [52.455, 5.69306]

const MAP_STYLE = 'mapbox://styles/stevejonk/clo6yz6p200u601qs0wct801b'

export function MapView({ currentLocation, setCurrentLocation }: MapViewProps) {
  const data = archeomaps as unknown as Archeomaps
  const mapRef = useRef<MapRef | null>(null)
  const router = useRouter()

  const [[latitude, longitude], setLatLong] = useState<number[]>(INITIAL_LAT_LONG)

  const points: Location[] = useMemo(() => {
    return data.features
      .map((loc) => {
        const id = uuidv4()

        if (
          !loc?.geometry ||
          !loc?.geometry?.coordinates ||
          !loc?.geometry?.coordinates.length ||
          isNaN(loc.geometry.coordinates[0]) ||
          isNaN(loc.geometry.coordinates[1])
        ) {
          return {
            id,
            title: null,
            description: null,
            longitude: null,
            latitude: null,
          }
        }

        return {
          id,
          title: loc.properties.name,
          description: loc.properties.description,
          longitude: loc.geometry.coordinates[0],
          latitude: loc.geometry.coordinates[1],
        }
      })
      .filter(Boolean)
  }, [data])

  useEffect(() => {
    const locationLatLong = (router.query.location as string)?.split(',')
    console.log({ locationLatLong })

    if (locationLatLong && locationLatLong.length > 0 && points.length) {
      const initialLocation = points.find(
        (loc) =>
          loc.latitude === Number(locationLatLong[0]) &&
          loc.longitude === Number(locationLatLong[1])
      )

      console.log({ initialLocation, points })

      if (initialLocation) {
        setCurrentLocation(initialLocation)
      }
    }
  }, [router.query.location])

  useEffect(() => {
    const toZoom = currentLocation?.id ? 6 : 3

    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: toZoom, // reset to initial zoom when going back to overview
      duration: 2000,
    })
  }, [currentLocation, latitude, longitude])

  function onLocationDetail(setLoc: Location) {
    setCurrentLocation(setLoc)
    setLatLong([setLoc.latitude, setLoc.longitude])
    router.replace(`/?location=${setLoc.latitude},${setLoc.longitude}`)
  }

  return (
    <>
      <AnimatePresence>
        {currentLocation && (
          <DetailView title={currentLocation.title} description={currentLocation.description} />
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
        mapStyle={MAP_STYLE}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        {points.map((location, index) => {
          return (
            <Marker
              key={`${index}-${location.id}`}
              longitude={location.longitude}
              latitude={location.latitude}
              style={{ position: 'absolute', left: 0, top: 0, cursor: 'pointer' }}
              onClick={() => onLocationDetail(location)}
            >
              <div className="h-2 w-2 rounded-lg bg-gray-200 hover:bg-gray-700" />
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
    coordinates: [number, number]
  }
  properties: Record<string, null | string>
}

type Archeomaps = {
  name: 'Markers MP'
  type: 'FeatureCollection'
  features: Feature[]
}

export type Location = {
  id: string
  title: string | null
  description: string | null
  longitude: number | null
  latitude: number | null
}
