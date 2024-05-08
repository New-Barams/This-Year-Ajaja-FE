import { GetUserInformationResponse } from '@/types/apis/users/GetUserInformation';
import { axiosInstanceClient } from '@apis/axiosInstanceClient';
import { DOMAIN } from '@constants/api';

export const getUserInformation = () => {
  return axiosInstanceClient<GetUserInformationResponse>(DOMAIN.GET_USERS).then(
    (res) => res.data,
  );
};
