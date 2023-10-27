import { Map, Layer, Source, MapLayerMouseEvent, GeoJSONSource } from 'react-map-gl'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers'

import { type SetLocationProps } from 'pages'
import { formatName } from '@/utils/formatName'
import { useInitialMapZoom } from '@/utils/useInitialMapZoom'
import { Sidebar } from '@/components/Sidebar'
import archeomaps from 'data/archeomaps.json'

import { DetailView } from './DetailView'
import { useConfig } from '@/utils/useConfig'

export const INITIAL_LAT_LONG = [52.455, 5.69306]

export function MapView({ currentLocation, setCurrentLocation }: MapViewProps) {
  const { config, setConfig } = useConfig()
  const data = archeomaps as unknown as GeoJSON.FeatureCollection<GeoJSON.Geometry>
  const router = useRouter()

  const [mapRef, setRef] = useInitialMapZoom({
    data,
    location: router.query.location as string,
    currentLocation,
    setCurrentLocation,
  })

  function onMapClick(event: MapLayerMouseEvent) {
    const features = event.features || []

    if (features.length > 0 && mapRef?.current) {
      const feature = event.features[0] as GeoJSON.Feature<GeoJSON.Point>
      const clusterId = feature.properties.cluster_id
      const mapboxSource = mapRef.current.getSource('archeomaps') as GeoJSONSource

      if (clusterId) {
        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return
          mapRef.current.easeTo({
            center: feature.geometry.coordinates as [number, number],
            zoom,
            duration: 500,
          })
        })
      }

      if (!clusterId && feature) {
        // Redirect with loaction name in url, next useEffect will show DetailView
        setCurrentLocation({
          icon: feature?.properties?.icon,
          name: feature?.properties?.name,
          description: feature?.properties?.description,
          longitude: feature?.geometry.coordinates[0],
          latitude: feature?.geometry.coordinates[1],
        })

        mapRef.current.easeTo({
          center: feature.geometry.coordinates as [number, number],
          zoom: 7,
          duration: 500,
        })

        const formattedName = formatName(feature.properties.name)
        window.history.replaceState('', '', `/?location=${formattedName}`)
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {currentLocation && (
          <DetailView
            title={currentLocation.name}
            description={currentLocation.description}
            category={currentLocation.icon}
            onClickAway={() => setCurrentLocation(null)}
          />
        )}
      </AnimatePresence>
      <Sidebar config={config} setConfig={setConfig} />
      <Map
        ref={setRef}
        initialViewState={{
          latitude: INITIAL_LAT_LONG[0],
          longitude: INITIAL_LAT_LONG[1],
          zoom: 3,
        }}
        style={{ position: 'absolute', zIndex: 10, top: 0, left: 0, right: 0, bottom: 0 }}
        mapStyle={config.mapStyle.url}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
        onClick={onMapClick}
      >
        <Source
          id="archeomaps"
          type="geojson"
          data={data}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </>
  )
}

type MapViewProps = SetLocationProps

export type Location = {
  name: string | null
  description: string | null
  longitude: number | null
  latitude: number | null
  icon: string | null
}
