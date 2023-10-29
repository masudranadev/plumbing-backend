/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  user_name: process.env.SENDING_EMAIL,
  api_key: process.env.SENDING_EMAIL_API_KEY,
  sending_email: process.env.SENDING_EMAIL,
  jwt: {
    secret: process.env.JWT_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    reset_expires_in: process.env.JWT_RESET_EXPIRES_IN,
  },
};
