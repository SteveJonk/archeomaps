import { motion } from 'framer-motion'
import ReactHtmlParser from 'react-html-parser'

import { parseUrl } from '@/utils/parseUrl'
import { useGetGptSummary } from '@/queries/gpt'

export function DetailView({ description, title }: DetailViewProps) {
  const prompt = `Tell me something about ${title}, add html tags for styling`
  const { data: gptSummary, isLoading } = useGetGptSummary(title ? prompt : undefined)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute left-[2%] top-[5%] z-[9999] h-[90%] w-[96%] overflow-y-scroll rounded-2xl bg-gray-900 bg-opacity-80 p-6 xl:p-12"
    >
      <article className="max-w-[40em]">
        <h1 className="mb-8 text-3xl text-white">{title}</h1>
        {isLoading && <p>Generating content...</p>}

        {!isLoading &&
          (gptSummary?.choices?.[0] ? (
            <>
              <div className="text-white">
                {ReactHtmlParser(parseUrl(gptSummary.choices[0].message?.content))}
              </div>

              <hr className="my-4 h-[2px] border-0 bg-white" />

              <div className="text-white">{ReactHtmlParser(parseUrl(description))}</div>
            </>
          ) : (
            <div className="text-white">{ReactHtmlParser(parseUrl(description))}</div>
          ))}
      </article>
    </motion.div>
  )
}

type DetailViewProps = {
  title: string
  description: string
}
