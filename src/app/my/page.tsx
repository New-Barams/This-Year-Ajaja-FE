import { QUERY_KEY } from '@/constants';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getUserInformationServer } from '@apis/server/getUserInformationServer';
import MyPageClientComponent from './MyPageClientComponent';

export default async function Page() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.USER_INFORMATION],
    queryFn: () => getUserInformationServer(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyPageClientComponent />
    </HydrationBoundary>
  );
}
