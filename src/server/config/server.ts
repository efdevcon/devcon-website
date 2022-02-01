import * as dotenv from 'dotenv'

dotenv.config()

export const SERVER_CONFIG = {
  NODE_ENV: process.env.NODE_ENV,

  SESSION_SECRET: process.env.SESSION_SECRET,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || '',
  ELASTIC_ENDPOINT: process.env.ELASTIC_ENDPOINT || '',

  SMTP_DEFAULT_FROM_NAME: process.env.SMTP_DEFAULT_FROM_NAME || 'Devcon',
  SMTP_DEFAULT_FROM: process.env.SMTP_DEFAULT_FROM || 'support@devcon.org',
  SMTP_SERVICE: process.env.SMTP_SERVICE,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
}
