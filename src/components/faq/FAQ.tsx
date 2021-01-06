import React from 'react'
import { Category } from 'src/types/Category'
import { FAQ as Faq } from 'src/types/FAQ'

interface FaqProps {
  categories: Array<Category>
  faqs: Array<Faq>
}

export function FAQ(props: FaqProps) {
  return (
    <div>
      <h4>Categories</h4>
      <ul>
        {props.categories.map(i => {
          return <li key={i.title}>{i.title}</li>
        })}
      </ul>
      <h4>FAQs</h4>
      <ul>
        {props.faqs.map(i => {
          return (
            <li key={i.title}>
              <strong>{i.title}</strong>
              <p dangerouslySetInnerHTML={{ __html: i.body }} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
