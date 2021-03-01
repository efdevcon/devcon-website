import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './blog.module.scss'
import { Cards } from 'src/components/blog-overview'
import { useBlogs } from 'src/hooks/useBlogs'

export const Blog = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const blogs = useBlogs()

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>

      <PageContent transparent backgroundText={intl.formatMessage({ id: 'rtd_devcon_blog' })}>
        <div className={css['container']}>
          <Cards customCardClass={css['card']} blogs={blogs} />
        </div>
      </PageContent>
    </Page>
  )
})
