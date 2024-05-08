import { getUserInformation } from '@/apis/client/getUserInformation';
import { QUERY_KEY } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';

export const useGetUserInformationQuery = () => {
  const { data, isError, isFetching, error } = useQuery({
    queryKey: [QUERY_KEY.USER_INFORMATION],
    queryFn: getUserInformation,
    staleTime: Infinity,
  });

  return { userInformation: data!.data, isError, error, isFetching };
};
