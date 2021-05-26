import moment from 'moment'
import React from 'react'
import { Card } from 'src/components/common/card'
import { useBlogs } from 'src/hooks/useBlogs'
import { BlogPost } from 'src/types/BlogPost'
import css from './feed.module.scss'

interface Props {
  className?: string
}
export const Feed = (props: Props) => {
  const blogs = useBlogs()

  let className = css['feed']
  if (props.className) className += ` ${props.className}`

  return (
    <div className={className}>
      {blogs.map((blog: BlogPost) => {
        return (
          <div className={css['outer']}>
            <Card
              className={css['card']}
              key={blog.slug}
              title={blog.title}
              imageUrl={blog.imageUrl}
              expandLink={true}
              linkUrl={blog.permaLink}
              metadata={[moment(blog.date).format('ll'), blog.author]}
            />
          </div>
        )
      })}
    </div>
  )
}
