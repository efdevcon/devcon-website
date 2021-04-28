import React from 'react'
import IconMenu from 'src/assets/icons/menu.svg'
import IconCross from 'src/assets/icons/cross.svg'
import css from './foldout.module.scss'
import { Accordion } from 'src/components/common/accordion'
import { Newsletter } from 'src/components/common/newsletter'
import { SocialMedia } from 'src/components/common/layouts/footer'
import useGetElementHeight from 'src/hooks/useGetElementHeight'
import { Copyright } from 'src/components/common/layouts/Copyright'
import { createPortal } from 'react-dom'

const FoldoutContent = (props: any) => {
  const headerHeight = useGetElementHeight('header')
  const stripHeight = useGetElementHeight('strip')
  const fullHeaderHeight = headerHeight + stripHeight

  let foldoutClassName = `${css['foldout']} ${css['open']}`

  // if (props.foldoutOpen) foldoutClassName += ` ${css['open']}`

  if (!props.foldoutOpen) return false

  // Moving the foldout content to the root so we have better control over z-index in relation to the header
  return createPortal(
    <div className={foldoutClassName} style={{ '--headerHeight': `${fullHeaderHeight}px` }}>
      <div>
        <div className={css['top']}>{props.children}</div>
        {/* Accordion comes later, need to align design system before deciding on how to implement */}
        {/* <Accordion
          items={[
            {
              id: 'ABOUT',
              title: 'ABOUT',
              body: 'Some body',
              background: '',
            },
          ]}
        /> */}
        {/* <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p>{' '}
        <p>
          What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
          has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
          type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
          into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
          of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
          Aldus PageMaker including versions of Lorem Ipsum.
        </p> */}
        <div className={css['bottom']}>
          <SocialMedia url="devcon.org" />

          <div className={css['newsletter']}>
            <Newsletter />
          </div>

          <Copyright />
        </div>
      </div>
    </div>,
    document.body
  )
}

const Foldout = (props: any) => {
  const iconProps = {
    id: 'hamburger-toggle',
    className: `icon ${css['toggle']}`,
    onClick: () => props.setFoldoutOpen(!props.foldoutOpen),
    role: 'button',
  }

  return (
    <>
      {props.foldoutOpen ? <IconCross {...iconProps} style={{ width: '0.8em' }} /> : <IconMenu {...iconProps} />}

      <FoldoutContent foldoutOpen={props.foldoutOpen} setFoldoutOpen={props.setFoldoutOpen}>
        {props.children}
      </FoldoutContent>
    </>
  )
}

export { Foldout }
