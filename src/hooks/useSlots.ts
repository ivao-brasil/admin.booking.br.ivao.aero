import { ONE_HOUR } from './../constants';
import { useContext } from 'react';
import { IocContext } from '../context/IocContext';
import { AuthContext } from '../context/AuthContext';
import { useQuery } from 'react-query';

export const useSlots = (eventId: number, page = 1, perPage = 5) => {
  const { apiClient } = useContext(IocContext);
  const { token } = useContext(AuthContext);

  const { data: paginationSlots, isLoading } = useQuery(
    [
      'slots',
      eventId,
      {
        page,
        perPage,
      },
    ],
    () =>
      apiClient.getSlotsByEvent(eventId, token, {
        page,
        perPage,
      }),
    {
      staleTime: ONE_HOUR * 12,
      keepPreviousData: true,
    }
  );

  return {
    slots: paginationSlots ? paginationSlots.data : [],
    count: paginationSlots ? paginationSlots.total : 0,
    slotsLoading: isLoading,
  };
};
