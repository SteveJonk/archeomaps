import { useState } from 'react'
import archeomaps from '@/data/archeomaps.json'

export const useMapData = () => {
  const [mapData, setMapData] = useState<GeoJSON.FeatureCollection<GeoJSON.Geometry>>(
    archeomaps as GeoJSON.FeatureCollection<GeoJSON.Geometry>
  )

  return { mapData, setMapData }
}
