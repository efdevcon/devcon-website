import { GatsbyNode } from 'gatsby'
import { onCreateNode as onCreateNodePlugin } from './onCreateNode'
import { createPages as createPagesPlugin } from './createPages'
// import { onCreatePage as onCreatePagePlugin } from './onCreatePage'
import { createSchemaCustomization as createSchemaCustomizationPlugin } from './create-schema-customization/createSchemaCustomization'

export const onCreateNode: GatsbyNode['onCreateNode'] = onCreateNodePlugin
export const createPages: GatsbyNode['createPages'] = createPagesPlugin
// export const onCreatePage: GatsbyNode['onCreatePage'] = onCreatePagePlugin
export const createSchemaCustomization: any = createSchemaCustomizationPlugin // Type issue: https://github.com/gatsbyjs/gatsby/issues/27096
