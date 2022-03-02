export const Env = {
  API_HOST: process.env.REACT_APP_API_HOST || 'https://api.kronos.staging.br.ivao.aero',
  LOGO_URL: process.env.REACT_APP_LOGO_URL || 'https://assets.br.ivao.aero/logos/tag_white.png',
  DEV: Boolean(process.env.REACT_APP_DEV) || false,
};
