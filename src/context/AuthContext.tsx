import { createContext, FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { IocContext } from './IocContext';
import { Env } from '../env';

interface IAuthContext {
  signed: boolean;
  user: User | null;
  token: string;
  signIn: (ivaoToken: string) => Promise<void>;
  signOut: () => void;
  loading: Boolean;
  refreshToken: () => void;
  openIdInfo?: {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    userInfoEndpoint: string;
    jwksUri: string;
  }
}

export const AuthContext = createContext<IAuthContext>({
  signIn: (_: string) => Promise.reject(),
  signOut: () => {},
  refreshToken: () => {},
  signed: false,
  token: '',
  user: null,
  loading: true,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const { apiClient } = useContext(IocContext);
  const [token, setToken] = useState<string>(localStorage.getItem('token') || '');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [openIdInfo, setOpenIdInfo] = useState<IAuthContext["openIdInfo"]>();

  useEffect(() => {
    if (token) {
      setLoading(true);
      apiClient
        .getAuth()
        .then(setUser)
        .catch(() => {
          setToken('');
          localStorage.removeItem('token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [apiClient, token]);

  const signIn = useCallback(async (ivaoToken: string) => {
    const { jwt } = await apiClient.auth(ivaoToken);
    setToken(jwt);
    localStorage.setItem('token', jwt);
  }, [apiClient]);

  const signOut = useCallback(async () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
  },[]);

  const refreshToken = useCallback(() => {
    signOut();
  }, [signOut]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${Env.IVAO_API_SERVER}/.well-known/openid-configuration`);
        const data = await response.json();
        setOpenIdInfo({
          authorizationEndpoint: data.authorization_endpoint,
          tokenEndpoint: data.token_endpoint,
          userInfoEndpoint: data.userinfo_endpoint,
          jwksUri: data.jwks_uri,
        });
      } catch (error) {
        console.error("Error fetching OpenID:", error);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        signed: user ? user.admin && !user.suspended : false,
        refreshToken,
        token,
        user,
        loading,
        openIdInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
