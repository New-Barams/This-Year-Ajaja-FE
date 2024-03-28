import { getMyPlans } from '@/apis/client/getMyPlans';
import { QUERY_KEY } from '@/constants/queryKey';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetMyPlansForFootprintQuery = (year: number) => {
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_PLANS_FOR_FOOTPRINT],
    queryFn: getMyPlans,
    staleTime: Infinity,
    select: (data) => {
      const planData = data.data.find((item) => item.year === year);
      return planData
        ? [
            { planId: -1, planTitle: '모든 계획' },
            ...planData.getPlanList.map((plan) => {
              return {
                planId: plan.planId,
                planTitle: plan.title,
              };
            }),
          ]
        : [{ planId: -2, planTitle: '계획 없음' }];
    },
  });
  return { yearPlans: data! };
};
