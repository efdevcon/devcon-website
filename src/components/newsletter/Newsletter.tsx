import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { useFormField } from 'src/hooks/useFormField'
import { useIntl } from 'gatsby-plugin-intl'

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

  return (
    <form onSubmit={handleSubmit}>
      <h4>{intl.formatMessage({ id: 'newsletter.title' })}</h4>
      {result && (
        <div>
          <span>
            {result.result} {result.msg}
          </span>
        </div>
      )}
      <input type="email" id="email" placeholder="Email" {...emailField} />

      <button type="submit">{intl.formatMessage({ id: 'newsletter.subscribe' })}</button>
    </form>
  )
}
