import React from 'react'
import { useBlogs } from 'src/hooks/useBlogs'
import moment from 'moment'
import css from './blog-overview.module.scss'
import { Card } from '../common/card'
import { BlogPost } from 'src/types/BlogPost'

export function BlogOverview() {
  const blogs = useBlogs()

  return (
    <div>
      <h3>BLOG</h3>

      <div className={css['card-columns']}>
        {blogs.map((blog: BlogPost) => (
          <Card
            key={blog.slug}
            title={blog.title}
            imageUrl={blog.imageUrl}
            linkUrl={blog.slug}
            metadata={[moment(blog.date).format('ll'), blog.author]}
          />
        ))}
      </div>
    </div>
  )
}
