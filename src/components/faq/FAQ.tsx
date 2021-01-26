import React from 'react'
import { Collapse } from '../common/collapse'
import { Category } from 'src/types/Category'
import { FAQ as FaqType } from 'src/types/FAQ'
import css from './faq.module.scss'

import AskDeva from 'src/assets/images/ask-deva.png'
import IconMinus from 'src/assets/icons/minus.svg'
import { useFormField } from 'src/hooks/useFormField'

interface FaqProps {
  data: Array<Category>
  customCategoryTitle?: string // ideally used with a single FAQ category
}

export function FAQ(props: FaqProps) {
  const searchField = useFormField()
  
  const renderTitle = (title: string) => {
    if (props.customCategoryTitle) return props.customCategoryTitle

    return title;
  }

  return (
    <div>
      {/* <div className={css['filter-container']}>
        <div className={css['search-bar']}>
          <input type="text" placeholder='Filter by keywords' {...searchField} />
          <span className={css['subtitle']}>Filter FAQs using relevant key terms.</span>
        </div>
        <div>
          <img src={AskDeva} alt="Ask Deva" />
        </div>
      </div> */}

      {props.data.map((category: Category) => {
          return (
            <>
              <div id={category.id} className={css['category']}>
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
