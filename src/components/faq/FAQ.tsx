import React from 'react'
import { Category } from 'src/types/Category'
import { FAQ as FaqType } from 'src/types/FAQ'

interface FaqProps {
  data: Array<Category>
}

export function FAQ(props: FaqProps) {
  return (
    <div>
      <ul>
        {props.data.map((category: Category) => {
          return (
            <li key={category.id}>
              {category.title}
              {category.questions.length > 0 && (
                <ul id={category.id}>
                  {category.questions.map((q: FaqType) => {
                    return (
                      <li key={q.id}>
                        <strong>{q.title}</strong>
                        <p dangerouslySetInnerHTML={{ __html: q.body }} />
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
