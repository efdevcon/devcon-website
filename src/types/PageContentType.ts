import { Tag } from './tag'

export enum PageTemplateType {
  'none',
  'content',
}

export interface PageContentType {
  title: string
  description?: string
  body?: string
  tags?: Array<Tag>
  template: PageTemplateType
  parent?: PageContentType
  order?: number
  slug: string
  showInMenu: boolean
  autoTranslated?: boolean
  lang: string
  children: Array<PageContentType>
}
