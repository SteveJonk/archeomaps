import { ReactNode } from 'react'
import { SEO } from '../SEO'

const LayoutWrapper = ({ children }: Props) => {
  return (
    <>
      <SEO />
      <main>{children}</main>
    </>
  )
}

interface Props {
  children: ReactNode
}

export default LayoutWrapper
