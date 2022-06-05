import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { PrivateRoutes } from './routes/PrivateRoutes';
import { PublicRoutes } from './routes/PublicRoutes';
import { Env } from './env';

export const App = () => {
  const { user, signed, loading } = useContext(AuthContext);

  if (user && !signed) {
    window.location.href = Env.MAIN_SYSTEM_URL;
    return null;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return signed ? <PrivateRoutes /> : <PublicRoutes />;
};
