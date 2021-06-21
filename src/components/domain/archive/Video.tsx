import React from 'react'
import { PageHero } from 'src/components/common/page-hero'
import { Header } from 'src/components/common/layouts/header'
import { Footer } from 'src/components/common/layouts/footer'
import { SEO } from 'src/components/domain/seo'
import archiveCss from './archive.module.scss'
import css from './video.module.scss'
import { Tabs } from 'src/components/common/tabs'
import { Tab } from 'src/components/common/tabs/Tabs'

type VideoProps = {}

const Description = () => {
  return (
    <>
      <div className={css['tabs-video']}>
        {/* <Tabs>
          <Tab title="Profile">Details</Tab>
          <Tab title="Profile">Resources</Tab>
        </Tabs> */}
        <p>Details</p>
        <p>Resources</p>
      </div>

      <div className={css['content']}>
        <h1 className="font-xxl">Ethereum in 25 minutes.</h1>

        <div className={css['descriptors']}>
          <p className={css['descriptor']}>
            <span>Duration:</span> 25:16
          </p>
          <p className={css['descriptor']}>
            <span>Speaker:</span> Vitalik Buterin
          </p>
        </div>

        <div className={css['descriptors']}>
          <p className={css['descriptor']}>
            <span>Event:</span> Devcon 2
          </p>
          <p className={css['descriptor']}>
            <span>Type:</span> Keynote
          </p>
          <p className={css['descriptor']}>
            <span>Expertise:</span> Beginner
          </p>
        </div>

        <div className={css['description']}>
          <div className={css['text']}>
            Machine learning is being adopted more and more broadly in technology. Such success is largely due to a
            combination of algorithmic breakthroughs, computation resource improvements, and the access to a large
            amount of diverse training data. The collection of data can raise concerns about siloing, security, and user
            privacy. In this talk, I will highlight a new blockchain-based machine learning technology that allows users
            to share their data, train models in a fully decentralized way, and incentivize end users to keep their data
            on the network using the Oasis network. This technology, called HiveMind, leverages a federated learning
            framework to reduce overhead both in communication and computation. In addition, the talk will highlight the
            benefits of a novel blockchain-based secure aggregation protocol that ensures client-level differential
            privacy, and thus prevents information leakage from trained model parameters.
          </div>
          <div className={css['tags']}>
            <div className={css['group']}>
              <p className="font-bold">Related Tags:</p>
            </div>
            <div className={css['group']}>
              <p className="font-bold">Playlists:</p>
            </div>
          </div>
        </div>
      </div>

      <div className={css['speakers']}>speakers</div>
    </>
  )
}

const Suggested = () => {
  return (
    <>
      <div className={css['tabs-suggested']}>suggested</div>

      <div className={css['list-description']}>
        <p>Description playlist</p>
      </div>

      <div className={css['list']}>
        <p>List of videos</p>
      </div>
    </>
  )
}

export const Video = (props: VideoProps) => {
  return (
    <div className={archiveCss['container']}>
      <SEO />
      <Header />

      <PageHero asBackground />

      <div className={css['container']}>
        <div className="section">
          <div className="content">
            <div className={css['player']}>
              <div className="aspect">
                <iframe
                  src="https://www.youtube.com/embed/lCcwn6bGUtU"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="content">
            <div className={css['body']}>
              <Description />
              <Suggested />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
