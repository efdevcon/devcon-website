import { Tag } from './tag'

export enum PageTemplateType {
  'none',
  'content',
  'dips',
}

export interface Page {
  title: string
  description?: string
  body?: string
  tags?: Array<Tag>
  template: PageTemplateType
  parent?: Page
  order?: number
  slug: string
  showInMenu: boolean
  translationVerified?: boolean
  lang: string
  children: Array<Page>
}
