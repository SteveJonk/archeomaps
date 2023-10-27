import { type MapStyle, mapStyles } from '@/data/mapStyles'
import { useState } from 'react'

const DEFAULT_CONFIG = {
  mapStyle: mapStyles[0],
}

export const useConfig = () => {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG)

  return { config, setConfig }
}

export type Config = {
  mapStyle: MapStyle
}
