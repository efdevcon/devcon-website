import React from 'react'
import { useFormField } from 'hooks/useFormField'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import css from './newsletter.module.scss'
import { Alert } from '../alert'
import { Button } from 'components/common/button'

export interface Result {
  result: 'success' | 'error'
  msg: string
}

interface Props {
  id?: string
}

export const Newsletter = (props: Props) => {
  const intl = useTranslations()
  const emailField = useFormField()
  const [result, setResult] = React.useState<Result | undefined>(undefined)

  const translateMessage = (message: string) => {
    if (message.includes('Thank you for subscribing')) {
      return intl('newsletter_subscribed')
    }
    if (message.includes('The email you entered is not valid')) {
      return intl('newsletter_notValid')
    }
    if (message.includes('is already subscribed')) {
      return intl('newsletter_alreadySubscribed')
    }

    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // let result = (await addToMailchimp(emailField.value, {})) as Result
    // result.msg = translateMessage(result.msg)
    setResult(result)
  }

  function onDismiss() {
    setResult(undefined)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p className="semi-bold">{intl('newsletter_title')}</p>
        <div>
          {result ? (
            <div className={css['alert-container']}>
              <Alert type={result.result} message={result.msg} dismissable={true} dismissed={onDismiss} />
            </div>
          ) : (
            <>
              <p>{intl('newsletter_subtitle')}</p>
              <div className={css['container']}>
                <input
                  className={css['input']}
                  type="email"
                  id={props.id ?? 'newsletter_email'}
                  placeholder={intl('newsletter_enter')}
                  {...emailField}
                />
                <Button className={`black ghost ${css['button']} thin-borders`} type="submit">
                  {intl('newsletter_subscribe')}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  )
}
