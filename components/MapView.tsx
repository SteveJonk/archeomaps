import { useEffect, useMemo, useRef, useState } from 'react'
import { Layer, Map, MapRef, Marker, Source } from 'react-map-gl'
import archeomaps from 'data/archeomaps.json'
import { v4 as uuidv4 } from 'uuid'

export const INITIAL_LAT_LONG = [52.455, 5.69306]

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

export function MapView() {
  const data = archeomaps as unknown as Archeomaps

  const mapRef = useRef<MapRef | null>(null)
  const [locationId, setLocationId] = useState<string | null>(null)
  const [[latitude, longitude], setLatLong] = useState<number[]>(INITIAL_LAT_LONG)

  function onLocationDetail(locationId: string) {
    setLocationId(locationId)
  }

  useEffect(() => {
    const toZoom = locationId ? 6 : 3

    mapRef.current?.flyTo({
      center: [longitude, latitude],
      zoom: toZoom, // reset to initial zoom when going back to overview
      duration: 2000,
    })
  }, [longitude, latitude, locationId])

  const points = useMemo(() => {
    return data.features.map((location) => ({
      id: uuidv4(),
      title: location.properties.name,
      longitude: location.geometry.coordinates[0],
      latitude: location.geometry.coordinates[1],
    }))
  }, [data])

  console.log({
    points,
  })

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        latitude: INITIAL_LAT_LONG[0],
        longitude: INITIAL_LAT_LONG[1],
        zoom: 3,
      }}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      {points.map((location) => (
        <Marker
          key={uuidv4()}
          longitude={location.longitude}
          latitude={location.latitude}
          style={{ position: 'absolute', left: 0, top: 0 }}
        >
          <div style={{ width: 20, height: 20, borderRadius: 100, backgroundColor: 'red' }} />
        </Marker>
      ))}
    </Map>
  )
}
