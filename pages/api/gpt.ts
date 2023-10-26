import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

const COMPLETION_API = `${process.env.GPT_URL}/api/proxy/openai/chat/completions`

const router = createRouter<NextApiRequest, NextApiResponse>()

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const prompt = req.body.prompt

  if (!prompt) {
    return res.status(400).json('Missing prompt')
  }

  const amountOfParagraphs = 3
  const max_tokens = 200 * amountOfParagraphs
  const temperature = 0.9

  const result = await fetch(COMPLETION_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ['iO-GPT-Subscription-Key']: process.env.GPT_KEY,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      max_tokens,
      temperature,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  const responseBody = await result.json()
  res.json(responseBody)
})

// this will run if none of the above matches
router.all((req: NextApiRequest, res: NextApiResponse) => {
  res.status(405).json({
    error: 'Method not allowed',
  })
})

export default router.handler({
  onError(err: Error, req: NextApiRequest, res: NextApiResponse) {
    res.status(500).json({
      error: (err as Error).message,
    })
  },
})
