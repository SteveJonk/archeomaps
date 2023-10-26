import { useQuery } from '@tanstack/react-query'

export const fetchGpt = async (prompt: string) => {
  const response = await fetch('/api/gpt', {
    method: 'POST',
    body: JSON.stringify({
      prompt,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
  const json = await response.json()
  return json
}

export const useGetGptSummary = (prompt?: string) => {
  return useQuery({
    queryKey: ['gpt', prompt],
    queryFn: ({ queryKey }) => fetchGpt(queryKey[1]),
    enabled: Boolean(prompt),
  })
}
