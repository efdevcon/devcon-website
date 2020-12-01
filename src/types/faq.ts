import { Category } from "./category"

export interface FAQ {
  title: string
  body: string
  category: Array<Category>
  order?: number
  lang: string
}
