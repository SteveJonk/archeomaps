import '@/css/tailwind.css'
import '@/css/prism.css'

import '@fontsource/inter/variable-full.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ClientReload } from '@/components/ClientReload'
import { AnimatePresence } from 'framer-motion'
import LayoutWrapper from '@/components/LayoutWrapper'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      <LayoutWrapper>
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scroll(0, 0)}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </LayoutWrapper>
    </>
  )
}
