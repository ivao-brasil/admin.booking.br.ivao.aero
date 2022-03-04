export const Env = {
  API_HOST: process.env.REACT_APP_API_HOST || 'https://api.kronos.br.ivao.aero',
  LOGO_URL: process.env.REACT_APP_LOGO_URL || 'https://assets.br.ivao.aero/logos/tag_white.png',
  MAIN_SYSTEM_URL: process.env.REACT_APP_MAIN_SYSTEM_URL || 'https://kronos.br.ivao.aero',
  DEV: Boolean(process.env.REACT_APP_DEV) || false,
};
