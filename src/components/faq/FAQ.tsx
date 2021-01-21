import React from 'react'
import { Collapse } from '../common/collapse'
import { Category } from 'src/types/Category'
import { FAQ as FaqType } from 'src/types/FAQ'
import css from './faq.module.scss'

import IconMinus from 'src/assets/icons/minus.svg'

interface FaqProps {
  data: Array<Category>
  customCategoryTitle?: string // ideally used with a single FAQ category
}

export function FAQ(props: FaqProps) {

  const renderTitle = (title: string) => {
    if (props.customCategoryTitle) return props.customCategoryTitle

    return title;
  }

  return (
    <div className={css['container']}>
      {props.data.map((category: Category) => {
        return (
          <>
            <div className={css['category']}>
              <h3 key={category.id}>{renderTitle(category.title)}</h3>
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
