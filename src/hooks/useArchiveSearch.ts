import { SearchParams } from 'src/server/services/search-client'
import { ArchiveVideo } from 'src/types/ArchiveVideo'
import { FetchedResult } from 'src/types/FetchedResult'
import { PagedResult } from 'src/types/PagedResult'
import { usePagedSearch } from './usePagedSearch'

export const useArchiveSearch = (qs: string, params?: SearchParams): FetchedResult<PagedResult<ArchiveVideo>> => {
  let uri = `/api/archive/search${qs}`
  if (!qs) uri += '?'
  if (params?.q) uri += `&q=${params.q}`
  if (params?.from) uri += `&from=${params.from}`
  if (params?.size) uri += `&size=${params.size}`
  if (params?.sort) uri += `&sort=${params.sort}`
  if (params?.order) uri += `&order=${params.order}`
  
  return usePagedSearch(uri)
}
