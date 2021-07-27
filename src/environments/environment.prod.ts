import { Environment } from '../app/models/environment';

export const environment: Environment = {
  production: true,
  url: `${document.location.protocol}//${document.location.host}/api/v1`,
};
