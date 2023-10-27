import { useState } from 'react'
import archeomaps from '@/data/archeomaps.json'
import { Filters } from '@/utils/useConfig'

export const useMapData = () => {
  const fullMapData = archeomaps as GeoJSON.FeatureCollection<GeoJSON.Geometry>

  const [mapData, setMapData] = useState<GeoJSON.FeatureCollection<GeoJSON.Geometry>>(fullMapData)

  const filterMapData = (filters: Filters) => {
    const filteredMapFeatures = fullMapData.features.filter((mapFeature) =>
      filters?.categories ? filters?.categories[0] === mapFeature.properties.icon : true
    )
    setMapData({ ...fullMapData, features: filteredMapFeatures })
  }

  const resetMapData = () => {
    setMapData(fullMapData)
  }

  return { fullMapData, mapData, filterMapData, resetMapData }
}
