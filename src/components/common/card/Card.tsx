import React from 'react'
import { Link } from 'src/components/common/link'
import { GetExcerpt } from 'src/utils/formatting'
import css from './card.module.scss'
import IconArrowRight from 'src/assets/icons/arrow_right.svg'

interface CardProps {
  title: string
  description?: string
  imageUrl?: string
  linkUrl?: string
  date?: Date
  metadata?: string[]
}

// API of this component is still a bit up in the air
export const Card = (props: CardProps) => {
  let className = css['card']

  if (props.imageUrl) className = `${className} ${css['img']}`

  const link = props.linkUrl ? <Link to={props.linkUrl}>{props.title}</Link> : props.title

  return (
    <div className={className}>
      {props.imageUrl && (
        <div className={css['img-wrapper']}>
          <img src={props.imageUrl} className={css['img']} alt={props.title} />{' '}
        </div>
      )}

      <div className={css['body']}>
        <h4 className={css['title']}>{link}</h4>
        {props.description && <p className={css['text']}>{GetExcerpt(props.description)}</p>}

        <div className={css['bottom-section']}>
          {props.metadata && (
            <div className={css['metadata']}>
              {props.metadata.map((text, index) => (
                <small key={props.title + '_' + index}>{text}</small>
              ))}
            </div>
          )}

          {props.linkUrl && (
            <div className={css['read-more']}>
              <p>READ MORE</p>
              <IconArrowRight />
            </div>
          )}
        </div>
      </div>
    </div>
  )

  // if (props.linkUrl) {
  //   return (
  //     <Link to={props.linkUrl} className={css['card']}>
  //       {body}
  //     </Link>
  //   )
  // }

  // return <div className={css['card']}>{body}
}

// const createCardVariation = (CardVariation: FunctionComponent<CardProps>) => {
//   return (props: CardProps) => {
//     // Have to align on card API / shared functionality

//     return <CardVariation {...props} />
//   }
// }

// export const ImageCard = createCardVariation((props: CardProps) => {
//   const body = (
//     <>
//       {props.imageUrl && <img src={props.imageUrl} className={css['card-img']} alt={props.title} />}
//       <div className={css['card-body']}>
//         <h4 className={css['card-title']}>{props.title}</h4>
//         {props.description && <p className={css['card-text']}>{GetExcerpt(props.description)}</p>}
//         <div className={css['card-meta']}>
//           {props.metadata && props.metadata.map((text, index) => <small key={props.title + '_' + index}>{text}</small>)}
//           {props.linkUrl && <IconArrowRight />}
//         </div>
//       </div>
//     </>
//   )

//   if (props.linkUrl) {
//     return (
//       <Link to={props.linkUrl} className={css['card']}>
//         {body}
//       </Link>
//     )
//   }

//   return <div className={css['card']}>{body}</div>
// })

// export const SimpleCard = createCardVariation((props: CardProps) => {
//   return (
//     <div className={css['card-variation-simple']}>
//       <p className={css['date']}>{props.date}</p>
//       <h3>{props.title}</h3>
//       {/* {props.description && <p className={css['summary']}>{props.description}</p>} */}
//       {props.description && <p className={css['summary']}>{props.description}</p>}

//       <div className={css['bottom-section']}>
//         <div className={css['twitter']}>
//           <p>@EFDEVCON</p>
//           <Twitter />
//         </div>

//         <div className={css['learn-more']}>
//           <p>LEARN MORE</p>
//           <IconArrowRight />
//         </div>
//       </div>
//     </div>
//   )
// })
