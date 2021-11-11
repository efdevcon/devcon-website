import nodemailer, { Transporter } from 'nodemailer'
import { SERVER_CONFIG } from '../config/server'
import addEmailTemplate from '../../templates/email.html'

require('dotenv').config()

type EmailTemplates = 'add-email'

export interface EmailServiceInterface {
  sendMail(to: string, template: EmailTemplates, properties: { [key: string]: any }): void
}

export class EmailService implements EmailServiceInterface {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SERVER_CONFIG.SMTP_SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: SERVER_CONFIG.SMTP_USERNAME,
        pass: SERVER_CONFIG.SMTP_PASSWORD
      }
    })
  }

  async sendMail(to: string, template: EmailTemplates, properties: { [key: string]: string }) {
    const from = `"${SERVER_CONFIG.SMTP_DEFAULT_FROM_NAME}" <${SERVER_CONFIG.SMTP_DEFAULT_FROM}>`
    const subject = template === 'add-email' ? 'Add your email to Devcon.org' : ''
    const html = template === 'add-email' ? replace(addEmailTemplate, properties) : ''
    if (!subject || !html) return
    
    const response = await this.transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: 'Update text email..',
      html: html,
    })
    
    console.debug('Email response', response)
  }
}

function replace(template: string, data: any) {
  const pattern = /{%\s*(\w+?)\s*%}/g; // {%property%}
  return template.replace(pattern, (_, token) => data[token] || '');
}