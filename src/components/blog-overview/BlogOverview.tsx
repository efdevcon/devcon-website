import { Link } from 'gatsby'
import React from 'react'
import { useBlogs } from 'src/hooks/useBlogs'

export function BlogOverview() {
  const blogs = useBlogs()

  return (
    <div>
      <h3>Blog Overview</h3>

      <ul>
        {blogs.map(i => (
          <li key={i.date.toISOString()}>
            <Link to={`${i.slug}`}>{i.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
