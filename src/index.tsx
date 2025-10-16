import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { AuthProvider } from './context/AuthContext';
import { IocProvider } from './context/IocContext';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ONE_HOUR } from './constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: ONE_HOUR,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <IocProvider>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </IocProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
