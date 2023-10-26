import { motion } from 'framer-motion'

export function DetailView({ title, description }: DetailViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute left-[3%] top-[5%] z-[9999] flex h-[90%] w-[94%] justify-between bg-gray-900 bg-opacity-80 px-4 py-6 sm:px-6 xl:px-0"
    >
      <h1 className="mb-8 text-white">{title}</h1>
      <div className="text-white">{description}</div>
    </motion.div>
  )
}

type DetailViewProps = {
  title: string
  description: string
}
