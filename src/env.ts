const isDev = import.meta.env.MODE === 'development';

export const Env = {
  LOGO_URL: import.meta.env.VITE_LOGO_URL || 'https://assets.br.ivao.aero/logos/tag_white.png',
  MAIN_SYSTEM_URL: import.meta.env.VITE_MAIN_SYSTEM_URL || 'https://kronos.br.ivao.aero',
  DEV: import.meta.env.VITE_DEV === 'true' || isDev,
  IVAO_KRONOS_API_SERVER: import.meta.env.VITE_IVAO_KRONOS_API_HOST || (isDev
    ? 'http://localhost:3003/api'
    : 'https://api.kronos.br.ivao.aero'),
  IVAO_API_SERVER: import.meta.env.VITE_IVAO_API_HOST || (isDev
    ? 'http://localhost:3003'
    : ''),
  CLIENT_ID: import.meta.env.VITE_CLIENT_ID || '',
  CLIENT_URL: import.meta.env.VITE_CLIENT_URL || '',
};
