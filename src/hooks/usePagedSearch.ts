import useSWR from 'swr'
import { FetchedResult } from '../types/FetchedResult'

const fetcher = async (url: string) => {
  const response = await fetch(url)
  const result = await response.json()
  const acceptedStatus = [200, 304]

  if (!acceptedStatus.includes(response.status)) {
    throw new Error(result.message)
  }

  return result.data
}

export const usePagedSearch = <T>(uri: string): FetchedResult<T> => {
  const { data, error } = useSWR(uri, fetcher)

  if (error) {
    console.error('ERROR:', error)
    console.log('Unable to fetch paged result', uri)
  }

  return {
    isLoading: !error && !data,
    isError: !!error,
    data: data,
  }
}