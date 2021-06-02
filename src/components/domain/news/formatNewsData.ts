import { NewsItem } from 'src/types/NewsItem'

const sortNews = (data: any): Array<NewsItem> => {
  return data.slice().sort((a: any, b: any) => {
    const d1 = new Date(a.frontmatter?.date)
    const d2 = new Date(b.frontmatter?.date)

    return d1 < d2 ? 1 : -1
  })
}

export const formatNewsData = (data: any): Array<NewsItem> => {
  return sortNews(data.map((node: any) => {
    const { id, date, author, title, url, imageUrl, tags } = node.frontmatter

      return {
        id,
        title,
        description: node.rawMarkdownBody,
        url: url || title,
        date,
        imageUrl,
        tags,
        author,
      } as NewsItem
    })
  )
}
