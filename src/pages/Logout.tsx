import { useQueryClient } from 'react-query';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Env } from '../env';

export const Logout = () => {
  const { signOut } = useContext(AuthContext);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.removeQueries();
    signOut();
    window.location.href = Env.MAIN_SYSTEM_URL;
  });

  return <></>;
};
