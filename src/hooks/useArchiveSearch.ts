import { useState } from 'react'
import { SearchParams } from 'src/server/services/search-client'
import { ArchiveVideo } from 'src/types/ArchiveVideo'
import { FetchedResult } from 'src/types/FetchedResult'
import { PagedResult } from 'src/types/PagedResult'
import useSWR from 'swr'

const fetcher = async (url: string) => {
  const response = await fetch(url)
  const result = await response.json()
  const acceptedStatus = [200, 304]

  if (!acceptedStatus.includes(response.status)) {
    throw new Error(result.message)
  }

  return result.data
}

export const useArchiveSearch = (qs: string, params?: SearchParams): FetchedResult<PagedResult<ArchiveVideo>> => {
  const defaultData = { total: 0, currentPage: 0, items: [] }
  const [data, setData] = useState<PagedResult<ArchiveVideo>>(defaultData)
  let uri = `https://api.devcon.org/sessions${qs}`
  if (!qs) uri += '?'
  if (params?.q) uri += `&q=${params.q}`
  if (params?.from) uri += `&from=${params.from}`
  if (params?.size) uri += `&size=${params.size}`
  if (params?.sort) uri += `&sort=${params.sort}`
  if (params?.order) uri += `&order=${params.order}`

  console.log('Paged Search', uri)
  const { error, isValidating } = useSWR(uri, fetcher, {
    onSuccess: data => {
      setData(data)
    },
    onError: () => {
      setData(defaultData)
    },
    revalidateOnFocus: false
  })

  // total: number
  // currentPage: number
  // items: Array<T>

  return {
    isLoading: !error && isValidating,
    isError: !!error,
    data: {
      ...data,
      items: data.items.map((item: any) => {
        return {
          id: item.id,
          sourceId: item.sourceId,
          slug: item.id,
          edition: Number(item.eventId.replace('devcon-', '')),
          title: item.title,
          relatedVideos: [] as ArchiveVideo[],
          description: item.description,
          slidesUrl: item.resources_slides,
          youtubeUrl: `https://youtu.be/${item.sources_youtubeId}`,
          ipfsHash: item.sources_ipfsHash,
          ethernaPermalink: `https://etherna.io/embed/${item.sources_swarmHash}`,
          duration: item.duration,
          expertise: item.expertise,
          type: item.type,
          track: item.track,
          keywords: item.tags.split(','),
          tags: item.tags.split(','),
          speakers: [],
          profiles: []
        } as unknown as ArchiveVideo
      })      
    }
  }

  // if (result.data) {
  //   console.log('PAGED RESULT DATA', result.data)
  //   const data = { 
  //     ...result,
  //     data: {
  //       ...result.data,
  //       items: result.data.items.map((item: any) => {
  //         return {
  //           id: item.id,
  //           sourceId: item.sourceId,
  //           slug: item.id,
  //           edition: Number(item.eventId.replace('devcon-', '')),
  //           title: item.title,
  //           relatedVideos: [] as ArchiveVideo[],
  //           description: item.description,
  //           slidesUrl: item.resources_slides,
  //           youtubeUrl: `https://youtu.be/${item.sources_youtubeId}`,
  //           ipfsHash: item.sources_ipfsHash,
  //           ethernaPermalink: `https://etherna.io/embed/${item.sources_swarmHash}`,
  //           duration: item.duration,
  //           expertise: item.expertise,
  //           type: item.type,
  //           track: item.track,
  //           keywords: item.tags.split(','),
  //           tags: item.tags.split(','),
  //           speakers: [],
  //           profiles: []
  //         } as unknown as ArchiveVideo
  //       })
  //     }
  //   }
  //   console.log('RE-MAPPED DATA', data)
  //   return data
  // }

  // return result
}

// edition: filterState.editionFilterState?.activeFilter,
