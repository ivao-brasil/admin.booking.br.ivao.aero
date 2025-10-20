import { createContext, FunctionComponent, useEffect, useState } from 'react';
import { ApiClient } from '../clients/ApiClient';
import { Env } from '../env';

interface IIocContext {
  apiClient: ApiClient;
}

export const IocContext = createContext<IIocContext>({
  apiClient: new ApiClient(String(Env.IVAO_KRONOS_API_SERVER)),
});

export const IocProvider: FunctionComponent = ({ children }) => {
  const [apiClient, setApiClient] = useState(new ApiClient(String(Env.IVAO_KRONOS_API_SERVER)));

  useEffect(() => {
    setApiClient(new ApiClient(String(Env.IVAO_KRONOS_API_SERVER)));
  }, []);

  return <IocContext.Provider value={{ apiClient }}>{children}</IocContext.Provider>;
};
