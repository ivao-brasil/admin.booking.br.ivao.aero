const activeEnv = process.env.NODE_ENV || 'production';

let envVariables = {
  API_HOST: process.env.REACT_APP_API_HOST || 'https://api.kronos.br.ivao.aero',
  LOGO_URL: process.env.REACT_APP_LOGO_URL || 'https://assets.br.ivao.aero/logos/tag_white.png',
  MAIN_SYSTEM_URL: process.env.REACT_APP_MAIN_SYSTEM_URL || 'https://kronos.br.ivao.aero',
  AUTHORIZATION_SERVER: process.env.REACT_APP_AUTHORIZATION_SERVER || 'https://login.ivao.aero/index.php',
  DEV: Boolean(process.env.REACT_APP_DEV) || false,
};

if (activeEnv === 'development') {
  envVariables = {
    API_HOST: process.env.REACT_APP_API_HOST || 'http://localhost:3003/api',
    LOGO_URL: process.env.REACT_APP_LOGO_URL || 'https://assets.br.ivao.aero/logos/tag_white.png',
    MAIN_SYSTEM_URL: process.env.REACT_APP_MAIN_SYSTEM_URL || 'https://kronos.br.ivao.aero',
    AUTHORIZATION_SERVER: process.env.REACT_APP_AUTHORIZATION_SERVER || 'http://localhost:3003/login',
    DEV: Boolean(process.env.REACT_APP_DEV) || true,
  }
}

export const Env = envVariables;