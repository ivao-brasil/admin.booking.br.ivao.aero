export const Env = {
  LOGIN_HOST: process.env.REACT_APP_LOGIN_HOST || 'https://login.ivao.aero',
  API_HOST: process.env.REACT_APP_API_HOST || 'https://api.kronos.br.ivao.aero',
  ASSETS_HOST: process.env.REACT_APP_ASSETS_HOST || 'https://assets.br.ivao.aero',
  MAIN_SYSTEM_URL: process.env.REACT_APP_MAIN_SYSTEM_URL || 'https://kronos.br.ivao.aero',
  DEV: Boolean(process.env.REACT_APP_DEV) || false,
};
