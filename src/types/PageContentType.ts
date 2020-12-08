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
  parent: PageContentType
  order?: number
  showInMenu: boolean
  autoTranslated?: boolean
  lang: string
  children: Array<PageContentType>
}
