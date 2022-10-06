import { ONE_HOUR } from './../constants';
import { useInfiniteQuery } from 'react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { IocContext } from '../context/IocContext';

export const useEvents = (page = 1, perPage = 5) => {
  const { apiClient } = useContext(IocContext);
  const { token } = useContext(AuthContext);

  const { fetchNextPage, hasNextPage, data, isLoading } = useInfiniteQuery(
    ['events', { page, perPage }],
    ({ pageParam }) => apiClient.getEvents(token, pageParam),
    {
      staleTime: ONE_HOUR * 12,
      enabled: Boolean(token),
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        const allEvents = allPages.reduce((acc, page) => acc + page.data.length, 0);
        const hasMorePages = allEvents < (lastPage.total - 1);

        if (hasMorePages)
          return { page: lastPage.page + 1, perPage };

        return null;
      }
    }
  )

  return {
    fetchNextPage,
    hasNextPage,
    events: data ? data.pages.map(page => page.data).flat() : [],
    isLoading,
  };
};
