import { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { PublicRoutes } from './routes/PublicRoutes';
import { Env } from './env';

export const App = () => {
  const { user, signed, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user && !signed) {
      window.location.href = Env.MAIN_SYSTEM_URL;
    }
  }, [signed, signed]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return signed ? <PrivateRoutes /> : <PublicRoutes />;
};
