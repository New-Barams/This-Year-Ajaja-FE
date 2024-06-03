import { getPlan } from '@/apis/client/getPlan';
import { QUERY_KEY } from '@/constants/queryKey';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetPlanQuery = (id: number, isLogin: boolean = false) => {
  const { data, isFetching, isError, isPending } = useSuspenseQuery({
    queryKey: [{ planId: id }, QUERY_KEY.PLAN],
    queryFn: () => getPlan(id, isLogin),
    staleTime: Infinity,
  });
  return { plan: data!.data, isPending, isFetching, isError };
};
