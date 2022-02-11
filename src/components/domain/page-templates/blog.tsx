import React from 'react'
import Content from 'components/common/layouts/content'
import { pageHOC } from 'context/pageHOC'
import themes from '../themes.module.scss'

export default pageHOC(function BlogTemplate(props: any) {
  return (
    <Content theme={themes['blue']}>
      Blog
      {/* <SEO title={blog.frontmatter.Title} canonicalUrl={blog.frontmatter.permaLink} />

      <h2>{blog.frontmatter.title}</h2>
      <small>{blog.frontmatter.date}</small>
      <div dangerouslySetInnerHTML={{ __html: blog.html }} /> */}
    </Content>
  )
})
