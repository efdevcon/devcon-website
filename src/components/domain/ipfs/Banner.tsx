import React, { useState } from 'react'
import IpfsIcon from 'src/assets/icons/ipfs.svg'
import InfoIcon from 'src/assets/icons/info.svg'
import CopyIcon from 'src/assets/icons/copy.svg'
import { Link } from 'src/components/common/link'
import { Modal } from 'src/components/common/modal'
import css from './banner.module.scss'
import { Tooltip } from 'src/components/common/tooltip'
import { TruncateMiddle } from 'src/utils/formatting'

interface Props {
  hash: string
  learnMore?: boolean
  cta?: string
  className?: string
}

export const Banner = (props: Props) => {
  const [copied, setCopied] = useState(false)
  const [ipfsModal, setIpfsModal] = useState(false)

  let className = css['container']
  if (props.className) className += ` ${props.className}`

  if (!props.hash) return null
  
  return (
    <div className={className}>
      <div className={css['top']}>
        <div className={css['cta']}>
          <Link to={`https://ipfs.io/ipfs/${props.hash}`}>{props.cta ?? 'IPFS'}</Link>
          <span className={css['learn-more']} role="button"
            aria-label='Learn more about IPFS' onClick={() => setIpfsModal(true)}>
            <InfoIcon />
          </span>
        </div>
        <div className={css['link']}>
          <p>
            <IpfsIcon />
          </p>
          <p className={css['truncated']}>{TruncateMiddle(props.hash)}</p>
          <p className={css['hash']}>{props.hash}</p>
          <p>
            <Tooltip arrow={true} visible={copied} content={<p>Copied hash to clipboard</p>}>
              <span
                className={css['copy-icon']}
                role="button"
                aria-label='Copy hash to clipboard'
                onClick={() => {
                  if (window?.navigator?.clipboard) {
                    navigator.clipboard.writeText(props.hash)
                    setCopied(true)

                    setTimeout(() => {
                      setCopied(false)
                    }, 800)
                  }
                }}
              >
                <CopyIcon />
              </span>
            </Tooltip>
          </p>
        </div>

        <Modal open={ipfsModal} close={() => setIpfsModal(false)}>
          <div className={css['modal-container']}>
            <h4>What is IPFS — </h4>
            <div className={css['modal-content']}>
              <p>Let's just start with a one-line definition of IPFS:</p>
              <p className={css['lead']}>
                IPFS is a distributed system for storing and accessing files, websites, applications, and data.
              </p>
              <p className="semi-bold">Why Distribute Content?</p>
              <p>
                Help make devcon content less reliant on centralized platforms that may not be accessible by users
                around the world. Utilizing decentralized systems we can ensure that devcon content is always available
                to those interested in learning more about Ethereum regardless of intermediaries.
              </p>
              <p>
                <Link to="https://docs.ipfs.io/" indicateExternal>
                  Learn more about IPFS
                </Link>
              </p>
            </div>
          </div>
        </Modal>
      </div>
      {props.learnMore && (
        <div className={css['bottom']}>
          <p>
            Help decentralize Devcon content by pinning this video on IPFS.
            <span className={css['learn-more']} role="button" onClick={() => setIpfsModal(true)}>
              Learn More
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
