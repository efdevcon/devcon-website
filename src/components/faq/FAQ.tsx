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
        {/* <li>Category 1
          <ul>
            <li>Question 1: Answer</li>
            <li>Question 2: Answer</li>
            <li>Question 3: Answer</li>
          </ul>
        </li>
        <li>Category 2</li>
        <li>Category 3</li> */}
      </ul>
    </div>
  )
}
