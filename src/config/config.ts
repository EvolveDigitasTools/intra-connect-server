import { config as dotenvConfig } from 'dotenv';
import { load } from 'dotenv-extended';
dotenvConfig();  // Load common configurations from .env
console.log('hi', process.env.NODE_ENV, process.env.AUTH_CLIENT_ID)
load({
  schema: '.env',
  errorOnMissing: false,
  includeProcessEnv: true,
  silent: false,
  path: `.env.${process.env.NODE_ENV}`
});
