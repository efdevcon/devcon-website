import React from 'react'
import { PageContent, Page } from 'src/components/layouts/horizontal-layout'
import { useIntl } from 'gatsby-plugin-intl'
import css from './blog.module.scss'
import './react-slick-overrides.scss'
import { Cards, useBlogState, Arrows } from 'src/components/blog-overview'
// import { useBlogs } from 'src/hooks/useBlogs'

export const Blog = React.forwardRef((props: any, ref) => {
  const intl = useIntl()
  const blogState = useBlogState()

  return (
    <Page {...props} ref={ref}>
      <div className={css['background']}></div>

      <PageContent
        transparent
        renderTopRight={() => <Arrows noSwipe {...blogState} />}
        backgroundText={intl.formatMessage({ id: 'rtd_blog' })}
      >
        <div className={css['container']}>
          <Cards customCardClass={css['card']} {...blogState} expandLink noSwipe ref={blogState.sliderRef} />
        </div>
      </PageContent>
    </Page>
  )
})
