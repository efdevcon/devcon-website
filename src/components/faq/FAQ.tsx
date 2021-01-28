import React from 'react'
import { Collapse } from '../common/collapse'
import { Category } from 'src/types/Category'
import { FAQ as FaqType } from 'src/types/FAQ'
import css from './faq.module.scss'

import IconMinus from 'src/assets/icons/minus.svg'

interface FaqProps {
  data: Array<Category>
  filter?: string
  customCategoryTitle?: string // ideally used with a single FAQ category
}

export function FAQ(props: FaqProps) {  
  const renderTitle = (title: string) => {
    if (props.customCategoryTitle) return props.customCategoryTitle

    return title;
  }

  function toggleExpand(category: string) { 
    console.log("EXPAND", category);
  }

  function filter(questions: Array<FaqType>): Array<FaqType> { 
    if (!props.filter) return questions;

    const filter = props.filter.toLowerCase();
    return questions.filter(i => i.title.toLowerCase().includes(filter) || 
      i.body.toLowerCase().includes(filter))
  }

  return (
    <div>
      {props.data.map((category: Category) => {
          return (
            <>
              <div id={category.id} className={css['category']}>
                <h3 key={category.id}>{renderTitle(category.title)}</h3>
                <span role='button' className={css['collapse']} onClick={() => toggleExpand(category.title)}><IconMinus /></span>
              </div>

              {category.questions.length > 0 && filter(category.questions).map((question: FaqType) => {
                return <Collapse title={question.title} body={question.body} expanded={true} />
              })}
            </>
          )
      })}
    </div>
  )
}
