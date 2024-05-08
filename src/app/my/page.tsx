import { QUERY_KEY } from '@/constants';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getUserInformationServer } from '@apis/server/getUserInformationServer';
import MyPageClientComponent from './MyPageClientComponent';

const queryClient = new QueryClient();
queryClient.prefetchQuery({
  queryKey: [QUERY_KEY.USER_INFORMATION],
  queryFn: () => getUserInformationServer(),
});
export default function Page() {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyPageClientComponent />
    </HydrationBoundary>
  );
}
