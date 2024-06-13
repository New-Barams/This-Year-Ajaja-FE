import { axiosInstanceServer } from '@/apis/axiosInstanceServer';
import { DOMAIN } from '@/constants/api';
import { GetPlanResponse } from '@/types/apis/plan/GetPlan';

export const getPlanServer = async (id: number, isLogin: boolean) => {
  const { data } = await axiosInstanceServer.get<GetPlanResponse>(
    DOMAIN.GET_PLANS(id),
    { authorization: isLogin },
  );

  return data;
};
