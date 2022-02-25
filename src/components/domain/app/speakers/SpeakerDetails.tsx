import React from 'react'
import IconStar from 'assets/icons/star.svg'
import css from './speaker-details.module.scss'
import Image from 'next/image'
import makeBlockie from 'ethereum-blockies-base64'
import { SessionCard } from '../session'
import { Session } from 'types/Session'

export const SpeakerDetails = (props: any) => {
  const splitName = props.speaker.name.split(' ') as string[]
  const firstName = splitName.shift()
  const lastName = splitName.join(' ')

  return (
    <>
      <div className="aspect">
        <Image src={props.speaker.avatar ?? makeBlockie(props.speaker.name)} alt={props.speaker.name}
          objectFit='contain' layout='fill' />
      </div>

      <div className="section">
        <div className="content">
          <h1 className={css['header']}>
            {firstName}
            <br /> {lastName}
          </h1>

          <div className={css['meta']}>
            <div className={css['details']}>
              <p className={css['role']}>Researcher (TODO)</p>
              <p className={css['company']}>Ethereum Foundation (TODO)</p>
            </div>
            <div className={css['socials']}>
              <IconStar />
              <IconStar />
              <IconStar />
            </div>
          </div>

          <div className={css['description']}>
            <p className={css['header']}>Profile</p>
            <p className={css['body']}>
              {props.speaker.description}
            </p>
          </div>

          {props.sessions.length > 0 &&
            <div className={css['sessions']}>
              <p className={css['header']}>Sessions</p>
              {props.sessions.map((i: Session) => {
                return <SessionCard key={i.id} session={i} />
              })}
            </div>
          }

          {/* <div className={css['videos']}>
            <p className={css['header']}>Archive</p>

            <VideoCard
              compact
              className={css['video']}
              video={{
                edition: 1,
                title: 'Agreement Making in Solidity: A Legal Perspective',
                description:
                  'Bill Marino of Cornell Tech presents on Agreement Making in Solidity: A Legal Perspective.',
                youtubeUrl: 'https://youtu.be/2xEwt8nIjC4',
                ipfsHash: 'Qmcv4av5mm6KkBz5QKE5gofyTtD45j18r67b3L2ZGkfMzN',
                duration: 978,
                expertise: 'Intermediate',
                type: 'Talk',
                track: 'Society and Systems',
                keywords: [],
                tags: ['Society and Systems'],
                speakers: ['Bill Marino'],
              }}
            />

            <VideoCard
              compact
              className={css['video']}
              video={{
                edition: 1,
                title: 'Agreement Making in Solidity: A Legal Perspective',
                description:
                  'Bill Marino of Cornell Tech presents on Agreement Making in Solidity: A Legal Perspective.',
                youtubeUrl: 'https://youtu.be/2xEwt8nIjC4',
                ipfsHash: 'Qmcv4av5mm6KkBz5QKE5gofyTtD45j18r67b3L2ZGkfMzN',
                duration: 978,
                expertise: 'Intermediate',
                type: 'Talk',
                track: 'Society and Systems',
                keywords: [],
                tags: ['Society and Systems'],
                speakers: ['Bill Marino'],
              }}
            />
          </div> */}
        </div>
      </div>
    </>
  )
}
