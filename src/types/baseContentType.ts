import { SEOContentType } from './seoContentType'
import { Tag } from './tag'

export enum PageTemplateType {
  'content',
  'overview',
}

export interface PageContentType extends SEOContentType {
  body: string
  tags?: Array<Tag>
  template: PageTemplateType
  order?: number
  showInMenu: boolean
  autoTranslated: boolean
  path: string
}
