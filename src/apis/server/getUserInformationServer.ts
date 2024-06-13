import { GetUserInformationResponse } from '@/types/apis/users/GetUserInformation';
import { DOMAIN } from '@constants/api';
import { axiosInstanceServer } from '../axiosInstanceServer';

export const getUserInformationServer = () => {
  return axiosInstanceServer<GetUserInformationResponse>(DOMAIN.GET_USERS).then(
    (res) => res.data,
  );
};
