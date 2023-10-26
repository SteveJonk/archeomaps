import { motion } from 'framer-motion'

export const PageTransition = ({ children }) => (
  <motion.div
    initial={{ y: -300, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -300, opacity: 0 }}
    transition={{ duration: 0.2, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
)
