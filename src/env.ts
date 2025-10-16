const activeEnv = process.env.NODE_ENV || 'production';

let envVariables = {
  LOGO_URL: process.env.REACT_APP_LOGO_URL || 'https://assets.br.ivao.aero/logos/tag_white.png',
  MAIN_SYSTEM_URL: process.env.REACT_APP_MAIN_SYSTEM_URL || 'https://kronos.br.ivao.aero',
  DEV: Boolean(process.env.REACT_APP_DEV) || false,
  IVAO_KRONOS_API_SERVER: process.env.REACT_APP_IVAO_KRONOS_API_HOST || 'https://api.kronos.br.ivao.aero',
  IVAO_API_SERVER: process.env.REACT_APP_IVAO_API_HOST || '',
  CLIENT_ID: process.env.REACT_APP_CLIENT_ID || '',
  CLIENT_URL: process.env.REACT_APP_CLIENT_URL || '',
};

if (activeEnv === 'development') {
  envVariables = {
    LOGO_URL: process.env.REACT_APP_LOGO_URL || 'https://assets.br.ivao.aero/logos/tag_white.png',
    MAIN_SYSTEM_URL: process.env.REACT_APP_MAIN_SYSTEM_URL || 'https://kronos.br.ivao.aero',
    DEV: Boolean(process.env.REACT_APP_DEV) || true,
    IVAO_KRONOS_API_SERVER: process.env.REACT_APP_IVAO_KRONOS_API_HOST || 'http://localhost:3003/api',
    IVAO_API_SERVER: process.env.REACT_APP_IVAO_API_HOST || 'http://localhost:3003',
    CLIENT_ID: process.env.REACT_APP_CLIENT_ID || '',
    CLIENT_URL: process.env.REACT_APP_CLIENT_URL || '',
  }
}

export const Env = envVariables;
