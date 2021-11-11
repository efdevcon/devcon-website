import { EmailService } from './email-service'

test('Init search index client', () => {
  const client = new EmailService()

  expect(client).not.toBeNull()
})

test('Send blank test email', async () => {
  const client = new EmailService()

  await client.sendMail('uem5bkcwoy4nfeov@ethereal.email', 'add-email', {
    TITLE: 'Confirm email address',
    DESCRIPTION: 'Use the link below to confirm your email address and link it to your devcon.org user account.',
    CALL_TO_ACTION: 'Confirm Email',
    URL: 'https://www.devcon.org/'
  })
})
