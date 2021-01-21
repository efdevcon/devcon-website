import React from 'react'
import dipLogo from 'src/assets/images/devcon-logo.svg'
import css from './contribute.module.scss'

type ContributeProps = {}

export const Contribute = (props: ContributeProps) => {
  return (
    <div id="contribute" className={css['container']}>
      <div className={css['dip-description']}>
        <h3 className="subsection-header">CONTRIBUTE</h3>
        <p>
          {/* This is all coming straight from the CMS, just plopping some dummy data in to style it*/}
          <b>Devcon Improvement Proposals (DIPs)</b> provide a mechanism for collecting collaborative community input on
          what should be included at the upcoming Devcon. While we are excited to have a more formal process to hear
          ideas from the community (roughly inspired by the more decentralized PEP, BIP and EIP processes), this is an
          experiment, and it should be understood that approval of proposals ultimately lies solely with the Devcon
          team. DIPs focus on collaboration in the ecosystem between different projects. The Devcon team also publishes
          <br />
          <br />
          Requests For Proposals (RFPs), which are specific ideas we'd love to see take place for the next Devcon
          edition. They are available on our forum.
        </p>
      </div>
      <div className={css['authors']}>
        <div className={css['row']}>
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
        </div>
        <div className={css['row']}>
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
        </div>
        <div className={css['row']}>
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
        </div>
        <div className={css['row']}>
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
          <img className={css['circular-img']} alt="" src={dipLogo} />
        </div>
      </div>
    </div>
  )
}
