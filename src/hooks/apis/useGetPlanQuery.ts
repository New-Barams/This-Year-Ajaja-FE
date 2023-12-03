import { getPlan } from '@/apis/client/getPlan';
import { QUERY_KEY } from '@/constants/queryKey';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPlanQuery = (id: number) => {
  const { data, isFetching, isError } = useSuspenseQuery({
    queryKey: [{ planId: id }, QUERY_KEY.PLAN],
    queryFn: () => getPlan(id),
    staleTime: Infinity,
  });
  return { plan: data!.data, isFetching, isError };
};
