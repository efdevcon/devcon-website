import { GatsbyNode } from 'gatsby'

export const onCreatePage: GatsbyNode['onCreatePage'] = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Detects the index page, not sure where news lives yet
  if (['/', '/en/', '/es/'].includes(page.path)) {
    deletePage(page)

    createPage({
      ...page,
      context: {
        ...page.context,
        withNews: true,
      },
    })
  } else {
    deletePage(page)

    createPage({
      ...page,
      context: {
        ...page.context,
        withNews: false,
      },
    })
  }
}
