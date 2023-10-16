import { config as dotenvConfig } from 'dotenv';
import { load } from 'dotenv-extended';
dotenvConfig();  // Load common configurations from .env
load({
  schema: '.env',
  errorOnMissing: false,
  includeProcessEnv: true,
  silent: false,
  path: `.env.${process.env.NODE_ENV}`
});
