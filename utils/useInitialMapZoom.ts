import { useCallback, useRef } from 'react'
import { useRouter } from 'next/router'

import { formatName } from '@/utils/formatName'
import { type SetLocationProps } from 'pages'
import { MapRef } from 'react-map-gl'

export function useInitialMapZoom({
  mapData,
  location,
  setCurrentLocation,
}: UseInitialMapZoomProps): UseInitialMapZoomReturn {
  const ref = useRef<MapRefType>(null)
  const router = useRouter()

  const setRef = useCallback(
    (node: MapRefType) => {
      if (ref.current) {
        // Make sure to cleanup any events/references added to the last instance
      }

      if (node) {
        if (router.query.location) {
          const locationName = router.query.location as string

          const urlLocation = mapData.features.find((feature: GeoJSON.Feature<GeoJSON.Point>) => {
            const findFormattedString = formatName(feature.properties.name)
            return locationName === findFormattedString
          }) as GeoJSON.Feature<GeoJSON.Point> | undefined

          setCurrentLocation({
            icon: '',
            name: urlLocation?.properties?.name,
            description: urlLocation?.properties?.description,
            longitude: urlLocation?.geometry.coordinates[0],
            latitude: urlLocation?.geometry.coordinates[1],
          })

          node.easeTo({
            center: urlLocation.geometry.coordinates as [number, number],
            zoom: 7,
            duration: 500,
          })
        }
      }

      ref.current = node
    },
    [location]
  )

  return [ref, setRef]
}

type MapRefType = MapRef | null

type UseInitialMapZoomProps = SetLocationProps & {
  location: string
  mapData: GeoJSON.FeatureCollection<GeoJSON.Geometry>
}

type UseInitialMapZoomReturn = [React.MutableRefObject<MapRefType>, (node: MapRefType) => void]

// useEffect(() => {
//   // Load the initial location from the url
//   console.log({
//     location: router.query.location,
//     map: mapRef.current,
//     current: currentLocation,
//   })

//   if (router.query.location && mapRef.current && !currentLocation) {
// const locationName = router.query.location as string

// const urlLocation = data.features.find((feature: GeoJSON.Feature<GeoJSON.Point>) => {
//   const findFormattedString = formatName(feature.properties.name)
//   return locationName === findFormattedString
// }) as GeoJSON.Feature<GeoJSON.Point> | undefined

// setCurrentLocation({
//   name: urlLocation?.properties?.name,
//   description: urlLocation?.properties?.description,
//   longitude: urlLocation?.geometry.coordinates[0],
//   latitude: urlLocation?.geometry.coordinates[1],
// })

// mapRef.current.easeTo({
//   center: urlLocation.geometry.coordinates as [number, number],
//   zoom: 7,
//   duration: 500,
// })
//   }
// }, [router.query?.location, mapRef, setRef, currentLocation])
