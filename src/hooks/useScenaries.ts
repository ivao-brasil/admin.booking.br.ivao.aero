import { useQuery } from 'react-query';
import { ONE_DAY } from '../constants';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IocContext } from '../context/IocContext';

export const useScenaries = (page = 1, perPage = 5) => {
  const { apiClient } = useContext(IocContext);
  const { token } = useContext(AuthContext);

  const { data, isLoading } = useQuery(
    [
      'scenaries', { page, perPage }
    ],
    () => apiClient.getScenaries(token, { page, perPage }),
    {
      staleTime: ONE_DAY,
      enabled: Boolean(token),
      keepPreviousData: true
    }
  );

  return {
    scenaries: data ? data.data : [],
    count: data ? data.total : 0,
    scenariesLoading: isLoading,
  };
};
