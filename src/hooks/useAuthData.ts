import { useContext } from 'react';
import { IocContext } from '../context/IocContext';
import { useQuery } from 'react-query';
import { AxiosError } from "axios";
import { User } from '../types/User';
import { ONE_HOUR } from '../constants';

export function useAuthData() {
    const { apiClient } = useContext(IocContext);

    return useQuery<User, AxiosError>("authData",
      async () => await apiClient.getAuth(), {
        staleTime: ONE_HOUR / 2,
        retryOnMount: false
    });
}
