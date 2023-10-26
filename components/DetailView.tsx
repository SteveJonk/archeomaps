import { motion } from 'framer-motion'
import ReactHtmlParser from 'react-html-parser'

import { parseUrl } from '../utils/parseUrl'

export function DetailView({ title, description }: DetailViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute left-[3%] top-[5%] z-[9999] h-[90%] w-[94%] bg-gray-900 bg-opacity-80 p-6 px-4 sm:px-6"
    >
      <h1 className="mb-8 text-3xl text-white">{title}</h1>
      <div className="text-white">{ReactHtmlParser(parseUrl(description))}</div>
    </motion.div>
  )
}

type DetailViewProps = {
  title: string
  description: string
}
