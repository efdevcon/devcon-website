import React, { useEffect, useLayoutEffect } from 'react'
import Github from 'src/assets/icons/github.svg'
import css from './contribute.module.scss'
import { Link } from 'src/components/common/link'
import { Contributor } from 'src/types/dip'

type ContributeProps = {
  contributors: Array<Contributor>
}

const chunkArray = (array: Array<any>, nChunks: number): Array<Array<any>> => {
  const results = []
  const size = Math.ceil(array.length / nChunks)
  let i = 0

  while (i < array.length) results.push(array.slice(i, (i += size)))

  return results
}

/*
  TO FIX: on safari the animated tracks "flash" when they reset their animation (happens every 50 seconds so not that significant)
*/
const AutoScroller = (props: ContributeProps) => {
  const [containerSize, setContainerSize] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>()

  useLayoutEffect(() => {
    const syncTrackSize = () => {
      const { width } = containerRef.current?.getBoundingClientRect()!

      setContainerSize(width)
    }

    syncTrackSize()

    window.addEventListener('resize', syncTrackSize)

    return () => {
      window.removeEventListener('resize', syncTrackSize)
    }
  }, [])

  const maxThumbnailsInView = 6
  const nRows = 3

  let containerClass = css['scroll-container']

  const chunkedContributors = chunkArray(props.contributors, nRows)

  return (
    <div
      key={containerSize === 0 ? 'loading' : containerSize} // Remounting the element when containerSize changes solves a lot of safari edge cases by resetting the CSS animations
      ref={containerRef}
      className={containerClass}
      style={{
        '--container-size': `${containerSize}px`,
      }}
    >
      {chunkedContributors.map((contributors, index) => {
        const isOdd = index % 2 !== 0

        let className = css['track']

        if (containerSize) className += ` ${css['animate']}` // Have to wait with animating until containerSize is determined - bugs out in Safari otherwise
        if (isOdd) className += ` ${css['odd']} ${css['reverse']}`

        return (
          <div key={index} className={className}>
            {contributors.map(contributor => {
              return (
                <img
                  key={contributor.name}
                  className={css['thumbnail']}
                  alt={`Contributor: ${contributor.name}`}
                  src={contributor.avatarUrl}
                />
              )
            })}

            {/* Have to repeat some thumbnails to give the illusion of infinite loop */}
            {contributors.slice(0, maxThumbnailsInView).map(contributor => {
              return (
                <img
                  key={contributor.name}
                  className={css['thumbnail']}
                  alt={`Contributor: ${contributor.name}`}
                  src={contributor.avatarUrl}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export const Contribute = (props: ContributeProps) => {
  return (
    <section id="contribute" className={css['section']}>
      <h3 className="subsection-header">CONTRIBUTE</h3>
      <div className={css['container']}>
        <div className={css['left-section']}>
          <div className={css['dip-description']}>
            {/* This text block should come from the CMS, but it currently can't handle font-sizes, so have to find a solution (or compromise) */}
            <p>
              <b>Devcon Improvement Proposals (DIPs)</b> provide a mechanism for collecting collaborative community
              input on what should be included at the upcoming Devcon. While we are excited to have a more formal
              process to hear ideas from the community (roughly inspired by the more decentralized PEP, BIP and EIP
              processes), this is an experiment, and it should be understood that approval of proposals ultimately lies
              solely with the Devcon team. DIPs focus on collaboration in the ecosystem between different projects. The
              Devcon team also publishes
            </p>

            <br />

            <p className="font-xs">
              The Devcon team also publishes <b>Requests For Proposals (RFPs)</b>, which are specific ideas we'd love to
              see take place for the next Devcon edition. They are available on our forum.
            </p>
          </div>
          <div className={css['links']}>
            <Link to="https://forum.devcon.org" indicateExternal className="font-lg bold font-secondary">
              VISIT FORUM
            </Link>
            <Link to="https://forum.devcon.org" indicateExternal className="font-lg bold font-secondary">
              CREATE PROPOSAL
            </Link>
          </div>
        </div>
        <div className={css['contributors']}>
          <AutoScroller contributors={props.contributors} />
          <div className={css['info']}>
            <p>* DIP Github Contributors</p> <Github />
          </div>
        </div>
      </div>
    </section>
  )
}
