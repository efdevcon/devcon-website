import React from 'react'
import css from './grants.module.scss'
import IconMedal from 'src/assets/icons/medal.svg'
import { useIntl, FormattedHTMLMessage } from 'gatsby-plugin-intl'
import { Link } from 'src/components/common/link'

export function Grants() {
  const intl = useIntl()

  return (
    <div className={css['grants']}>
      <div className={css['top']}>
        <h3>{intl.formatMessage({ id: 'rtd_grants_header' })}</h3>

        <p className={`${css['text']} bold`}>{intl.formatMessage({ id: 'rtd_grants_description_1' })}</p>

        <p className={css['text']}>
          <FormattedHTMLMessage id="rtd_grants_description_2" />.
        </p>

        <p className={css['text']}>{intl.formatMessage({ id: 'rtd_grants_description_3' })}.</p>

        <p className={css['text']}>
          <FormattedHTMLMessage id="rtd_grants_description_4" />.
        </p>
      </div>

      <Link to="https://esp.ethereum.foundation/en/devcon-grants/" className="button lg white text-uppercase">
        {intl.formatMessage({ id: 'rtd_grants_apply' })}
        <IconMedal />
      </Link>
      {/* <button className="lg white text-uppercase">

      </button> */}
    </div>
  )
}
