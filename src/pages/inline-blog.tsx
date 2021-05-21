import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import css from './inline-blog.module.scss'

const InlineBlog = ({ data }: any) => {
  const blog = data.blogPosts.nodes[1]
  const shadowDOMRoot = React.useRef<HTMLDivElement>()

  // useEffect(() => {
  //   shadowDOMRoot?.current.attachShadow()
  // }, [])

  return (
    <div ref={shadowDOMRoot} className={css['container']}>
      <div className="section">
        <div className="content">
          <img src={blog.efblog.image} />
          <h1>{blog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default InlineBlog

export const query = graphql`
  query {
    blogPosts: allFeedDevconBlog {
      nodes {
        id
        efblog {
          image
        }
        title
        content
      }
    }
  }
`
