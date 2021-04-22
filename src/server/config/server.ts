import * as dotenv from 'dotenv';

dotenv.config();

export const SERVER_CONFIG = {
  NODE_ENV: process.env.NODE_ENV,

  SESSION_SECRET: process.env.SESSION_SECRET,
};
