import React, { useState } from 'react'
import { Collapse } from '../common/collapse'
import { Category } from 'src/types/Category'
import { FAQ as FaqType } from 'src/types/FAQ'
import css from './faq.module.scss'

import IconMinus from 'src/assets/icons/minus.svg'

interface FaqProps {
  data: Array<Category>
}

export function FAQ(props: FaqProps) {
  return (
    <div className={css['container']}>
      {props.data.map((category: Category) => {
        return (
          <>
            <div className={css['category']}>
              <h3 key={category.id}>{category.title}</h3>
              {/* <span role='button' className={css['collapse']}><IconMinus /></span> */}
            </div>

            {category.questions.length > 0 &&
              category.questions.map((question: FaqType) => {
                return <Collapse title={question.title} body={question.body} />
              })}
          </>
        )
      })}
    </div>
  )
}
