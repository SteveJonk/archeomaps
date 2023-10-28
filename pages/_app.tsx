import '@/css/tailwind.css'
import '@/css/prism.css'

import '@fontsource/inter/variable-full.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import LayoutWrapper from '@/components/wrappers/LayoutWrapper'

export default function App({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000, // 30 seconds
            retry: false,
          },
        },
      })
  )

  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <LayoutWrapper>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scroll(0, 0)}>
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </QueryClientProvider>
      </LayoutWrapper>
    </>
  )
}
