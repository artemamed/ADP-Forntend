import { axiosInstance } from '@/lib/axios';
import { Client } from '@/types/Responses/Client';
import ApiWrapper from '@/utils/ApiWrapper';

export default function useClients() {
  const getClients = ApiWrapper<Client[]>(async (): Promise<Client[]> => {
    const { data } = await axiosInstance.get('/clients');
    return data.data;
  });

  return { getClients };
}
