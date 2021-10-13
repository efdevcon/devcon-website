import React from 'react'
import IconStar from 'src/assets/icons/star.svg'
import css from './speaker-details.module.scss'
import { VideoCard } from 'src/components/domain/archive/playlists'
import { SessionCard } from '../session'

export const SpeakerDetails = () => {
  return (
    <>
      <div className="aspect">
        <img
          src="https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
          className={css['image']}
        />
      </div>

      <div className="section">
        <div className="content">
          <h1 className={css['header']}>
            Luke
            <br /> Jacobsen
          </h1>

          <div className={css['meta']}>
            <div className={css['details']}>
              <p className={css['role']}>Researcher</p>
              <p className={css['company']}>Ethereum Foundation</p>
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
              Machine learning is being adopted more and more broadly in technology. Such success is largely due to a
              combination of algorithmic breakthroughs, computation resource improvements, and the access to a large
              amount of diverse training data. The collection of data can raise concerns about siloing, security, and
              user privacy.
            </p>
          </div>

          <div className={css['sessions']}>
            <p className={css['header']}>Sessions</p>

            <SessionCard />
            <SessionCard />
          </div>

          <div className={css['videos']}>
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
          </div>
        </div>
      </div>
    </>
  )
}
