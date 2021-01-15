import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { useFormField } from 'src/hooks/useFormField'
import { useIntl } from 'gatsby-plugin-intl'
import css from './newsletter.module.scss'
import { Alert } from '../common/alert'

export interface Result {
  result: 'success' | 'error'
  msg: string
}

export const Newsletter = () => {
  const intl = useIntl()
  const emailField = useFormField()
  const [result, setResult] = React.useState<Result | undefined>(undefined)

  const translateMessage = (message: string) => {
    if (message.includes('Thank you for subscribing')) {
      return intl.formatMessage({ id: 'newsletter.subscribed' })
    }
    if (message.includes('The email you entered is not valid')) {
      return intl.formatMessage({ id: 'newsletter.notValid' })
    }
    if (message.includes('is already subscribed')) {
      return intl.formatMessage({ id: 'newsletter.alreadySubscribed' })
    }

    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let result = (await addToMailchimp(emailField.value, {})) as Result
    result.msg = translateMessage(result.msg)
    setResult(result)
  }

  function onDismiss() {
    setResult(undefined)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p className="semi-bold">{intl.formatMessage({ id: 'newsletter.title' })}</p>
        <div>
          {result ? (
            <div className={css['alert-container']}>
              <Alert type={result.result} message={result.msg} dismissable={true} dismissed={onDismiss} />
            </div>
          ) : (
            <>
              <p>{intl.formatMessage({ id: 'newsletter.subtitle' })}</p>
              <div className={css['container']}>
                <input
                  className={css['input']}
                  type="email"
                  id="email"
                  placeholder={intl.formatMessage({ id: 'newsletter.enter' })}
                  {...emailField}
                />
                <button className={css['button']} type="submit">
                  {intl.formatMessage({ id: 'newsletter.subscribe' })}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
