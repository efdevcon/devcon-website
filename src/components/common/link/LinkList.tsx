import React from 'react'
import css from './link-list.module.scss'
import IconCalendar from 'src/assets/icons/schedule-plus.svg'
import IconLink from 'src/assets/icons/link-chain.svg'
import IconExternalLink from 'src/assets/icons/external-link.svg'
import googleDriveImage from './google-drive.png'

export const LinkList = (props: any) => {
  return (
    <div className={props.className}>
      {React.Children.map(props.children, child => {
        return React.cloneElement(child, {
          className: 'list-item',
          children: (() => {
            const isGoogleDrive = child.props.to.includes('drive.google.com')

            let className = css['link']

            if (isGoogleDrive) {
              className += ` ${css['with-thumbnail']}`
            }

            return (
              <div className={className}>
                {isGoogleDrive && <img src={googleDriveImage} className={css['thumbnail']} alt="Google drive" />}
                <div className={css['link-text']}>{child.props.children}</div>
                {isGoogleDrive ? <IconExternalLink /> : <IconLink />}
              </div>
            )
          })(),
        })
      })}
    </div>
  )
}
