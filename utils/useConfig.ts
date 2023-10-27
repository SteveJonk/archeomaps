import { useState } from 'react'
import { type MapStyle, mapStyles } from '@/data/mapStyles'
import archeomaps from '@/data/archeomaps.json'

const DEFAULT_CONFIG = {
  mapStyle: mapStyles[0],
}

export const useConfig = () => {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG)

  const categoryFilterOptions = [
    ...new Set(
      archeomaps.features.map((item) =>
        item.properties.icon ? item.properties.icon : item.properties.description
      )
    ),
  ]

  console.log(categoryFilterOptions)

  const filterOptions: Filters = {
    categories: categoryFilterOptions,
  }

  return { config, setConfig, filterOptions }
}

export type Config = {
  mapStyle: MapStyle
  filters?: Filters
}

export type Filters = {
  categories: string[]
}
