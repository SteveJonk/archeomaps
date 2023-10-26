import { useEffect, useRef } from 'react'
import { Map, MapRef, Layer, Source, MapLayerMouseEvent, GeoJSONSource } from 'react-map-gl'
import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers'

import { SetLocationProps } from 'pages'
import archeomaps from 'data/archeomaps.json'

import { DetailView } from './DetailView'

export const INITIAL_LAT_LONG = [52.455, 5.69306]

const MAP_STYLE = 'mapbox://styles/stevejonk/clo6yz6p200u601qs0wct801b'

export function MapView({ currentLocation, setCurrentLocation }: MapViewProps) {
  const data = archeomaps as unknown as Archeomaps
  const mapRef = useRef<MapRef | null>(null)
  const router = useRouter()

  function onMapClick(event: MapLayerMouseEvent) {
    const features = event.features || []

    if (features.length > 0) {
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
        const long = feature.geometry.coordinates[0]
        const lat = feature.geometry.coordinates[1]

        setCurrentLocation({
          name: feature.properties.name,
          description: feature.properties.description,
          longitude: long,
          latitude: lat,
        })
      }
    }
  }

  return (
    <>
      <AnimatePresence>
        {currentLocation && (
          <DetailView title={currentLocation.name} description={currentLocation.description} />
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

type Archeomaps = GeoJSON.FeatureCollection<GeoJSON.Geometry>

export type Location = {
  name: string | null
  description: string | null
  longitude: number | null
  latitude: number | null
}
