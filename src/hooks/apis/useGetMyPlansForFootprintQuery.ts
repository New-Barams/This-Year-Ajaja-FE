import { getMyPlans } from '@/apis/client/getMyPlans';
import { FOOTPRINT_PLAN } from '@/constants';
import { QUERY_KEY } from '@/constants/queryKey';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetMyPlansForFootprintQuery = (year: number) => {
  // TODO: year이 바뀔 때마다 이 Query가 다시 호출되지 않고, 호출은 한 번만 되고
  // 바뀌는 year에 따라 select를 통해서 return 하는 data만 바꿔주기
  const { data } = useSuspenseQuery({
    queryKey: [QUERY_KEY.MY_PLANS_FOR_FOOTPRINT],
    queryFn: getMyPlans,
    staleTime: Infinity,
    select: (data) => {
      const planData = data.data.find((item) => item.year === year);
      return planData
        ? [
            FOOTPRINT_PLAN.ALL_PLAN,
            ...planData.getPlanList.map((plan) => {
              return {
                planId: plan.planId,
                planTitle: plan.title,
              };
            }),
          ]
        : [FOOTPRINT_PLAN.EMPTY];
    },
  });
  return { yearPlans: data! };
};
