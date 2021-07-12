import { useLocation } from '@reach/router'
import queryString from 'query-string'

export const useQueryStringer = (filters: { [key: string]: any }, replaceState?: boolean): string => {
    const location = useLocation()
    let formattedObject = {} as any
    
    Object.entries(filters).forEach(([key, filter]) => {
        if (!filter) return

        if (typeof filter === 'object') {
            formattedObject[key] = Object.keys(filter)
        }
        if (typeof filter === 'string') {
            formattedObject[key] = filter
        }
    })
    
    let result = `?${queryString.stringify(formattedObject)}`
    if (result === '?') result = ''
    
    if (replaceState) {
        const url = `${location.pathname}${result}`
        window.history.replaceState({ path: url }, '', url)
    }

    return result
}