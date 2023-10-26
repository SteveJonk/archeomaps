export const mapCategory = (categoryCode: string): Category | undefined => {
  return categories[categoryCode] ?? ''
}

export const categories = {
  'red-older-2000bc': {
    name: 'Older than 2000 BC',
    color: 'red',
  },
  'yellow-2000bc-500bc': {
    name: '2000 BC - 500 BC',
    color: 'yellow',
  },
  'cyan-500bc-1000ad': {
    name: '500 BC - 1000 AD',
    color: 'cyan',
  },
  'blue-1000ad-current': {
    name: '1000 AD - Current',
    color: 'blue',
  },
  'green-geoglyph': {
    name: 'Geoglyph',
    color: 'green',
  },
  'pink-mysterious': {
    name: 'Mysterious',
    color: 'pink',
  },
  'purple-natural': {
    name: 'Natural',
    color: 'purple',
  },
}

type Category = {
  name: string
  color: string
}
