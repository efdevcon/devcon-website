import { useStaticQuery, graphql } from 'gatsby'
import { BlogPost } from 'src/types/BlogPost'

const defaultMaxItems = 5;

export const useBlogs = (maxItems: number = defaultMaxItems): Array<BlogPost> => {
  const data = useStaticQuery(graphql`
    query {
      blogs: allFeedDevconBlog {
        nodes {
          title
          description
          pubDate
          link
          efblog {
            image
          }
          content {
            encoded
          }
        }
      }
    }
  `)

  return data.blogs.nodes.map((i: any) => mapToBlog(i)).slice(0, maxItems)
}

function mapToBlog(source: any): BlogPost {
  return {
    title: source.title,
    date: new Date(source.pubDate),
    author: 'Devcon Team',
    body: source.content?.encoded,
    slug: '/',
    permaLink: source.link,
    imageUrl: source.efblog?.image
  }
}
