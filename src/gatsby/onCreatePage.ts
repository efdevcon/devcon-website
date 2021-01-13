import { GatsbyNode } from 'gatsby'

export const onCreatePage: GatsbyNode['onCreatePage'] = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // Could use a smarter regex when we have more languages
  if (['/en/', '/es/'].includes(page.path)) {
    deletePage(page);

    createPage({
      ...page,
      context: {
        ...page.context,
        withNews: true
      }
    });
  } /*else { <--- not really sure where news lives, so just adding it to the index page for now
    deletePage(page);

    createPage({
      ...page,
      context: {
        ...page.context,
        withNews: false
      }
    });
  }*/
}
