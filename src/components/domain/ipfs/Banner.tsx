import React, { useState } from 'react'
import IpfsIcon from 'src/assets/icons/ipfs.svg'
import IconInfo from 'src/assets/icons/info.svg'
import { Link } from 'src/components/common/link'
import { Modal } from 'src/components/common/modal'
import css from './banner.module.scss'

interface Props {
  hash: string
  learnMore?: boolean
  cta?: string
  className?: string
}

export const Banner = (props: Props) => {
    const [ipfsModal, setIpfsModal] = useState(false)
    const [pinModal, setPinModal] = useState(false)

    let className = css['container']
    if (props.className) className += ` ${props.className}`

    return (
        <div className={className}>
            <div className={css['top']}>
                <div className={css['cta']}>
                    <Link to={`https://ipfs.io/ipfs/${props.hash}`}>
                        {props.cta ?? 'IPFS'}
                    </Link>
                    <span className={css['learn-more']} role='button' onClick={() => setIpfsModal(true)}>
                        <IconInfo />
                    </span>
                </div>
                <div className={css['link']}>
                    <p className={css['icon']}>
                        <IpfsIcon />
                    </p>
                    <p className={css['hash']}>
                        <Link to={`https://ipfs.io/ipfs/${props.hash}`} indicateExternal>
                            {props.hash}
                        </Link>
                    </p>
                </div>

                <Modal open={ipfsModal} close={() => setIpfsModal(false)}>
                    <div className={css['modal-container']}>
                        <h4>What is IPFS — </h4>
                        <div className={css['modal-content']}>
                            <p>Let's just start with a one-line definition of IPFS:</p>
                            <p className={css['lead']}>IPFS is a distributed system for storing and accessing files, websites, applications, and data.</p>

                            <p>Learn more about <Link to='https://docs.ipfs.io/' indicateExternal>IPFS</Link>.</p>
                        </div>
                    </div>
                </Modal>
            </div>
            {props.learnMore && (
            <div className={css['bottom']}>
                <p>
                    Help decentralize Devcon content by pinning this video on IPFS.
                    <span className={css['learn-more']} role='button' onClick={() => setPinModal(true)}>
                        Learn More
                    </span>
                </p>
                <Modal open={pinModal} close={() => setPinModal(false)}>
                    <div className={css['modal-container']}>
                        <h4>Pin content to IPFS — </h4>
                        <div className={css['modal-content']}>
                            <p className={css['lead']}>Pinning is a very important concept in IPFS.</p>
                            <p>IPFS nodes treat the data they store like a cache, meaning that there is no guarantee that the data will continue to be stored. Pinning a CID (hash) tells an IPFS node that the data is important and mustn’t be thrown away. You should pin any content you consider important, to ensure that content is retained long-term. Since data important to someone else may not be important to you, pinning lets you have control over the disk space and data retention you need.</p>
                            <p>Learn more about <Link to='https://dweb-primer.ipfs.io/files-on-ipfs/pin-files' indicateExternal>pinning content on IPFS</Link>.</p>
                        </div>
                    </div>
                </Modal>
            </div>

            )}
        </div>
    )
}
