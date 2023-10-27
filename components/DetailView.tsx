import { motion } from 'framer-motion'
import ReactHtmlParser from 'react-html-parser'

import { parseUrl } from '@/utils/parseUrl'
import { useGetGptSummary } from '@/queries/gpt'
import { mapCategory } from '@/utils/mapCategory'
import { Loader } from '@/components/icons/Loader'

export function DetailView({ description, title, category, onClickAway }: DetailViewProps) {
  const prompt = `Tell me something about ${title}`
  const { data: gptSummary, isLoading } = useGetGptSummary(title ? prompt : undefined)

  return (
    <>
      <div
        role="presentation"
        className="absolute left-0 top-0 z-20 h-full w-full bg-transparent"
        onClick={onClickAway}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute left-[2%] top-[5%] z-30 h-[90%] w-[96%] overflow-y-scroll rounded-2xl bg-gray-900 bg-opacity-80 p-6 xl:p-12"
      >
        <article className="max-w-full sm:max-w-[40em]">
          <h1 className="mb-3 break-words text-3xl text-white">{title}</h1>
          <h3 className="mb-8 break-words text-lg text-white">{mapCategory(category).name}</h3>
          <div className="break-words text-white">{ReactHtmlParser(parseUrl(description))}</div>
          {isLoading && (
            <p className="mt-4">
              <Loader />
            </p>
          )}

          {!isLoading && gptSummary?.choices?.[0] && (
            <>
              <hr className="my-4 h-[2px] border-0 bg-white" />
              <div className="important bg-transparent text-white">
                {ReactHtmlParser(parseUrl(gptSummary.choices[0].message?.content))}
              </div>
            </>
          )}
        </article>
      </motion.div>
    </>
  )
}

type DetailViewProps = {
  title: string
  description: string
  category: string
  onClickAway: () => void
}
