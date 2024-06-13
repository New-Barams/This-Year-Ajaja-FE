import { QUERY_KEY } from '@/constants';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { getPlanServer } from '@apis/server/getPlanServer';
import PlanContent from './_components/PlanContent/PlanContent';

export default async function Page({ params }: { params: { planId: string } }) {
  const queryClient = new QueryClient();
  const { planId } = params;
  const isLogin = !!cookies().get('auth');
  await queryClient.prefetchQuery({
    queryKey: [{ planId: Number(planId) }, QUERY_KEY.PLAN],
    queryFn: () => getPlanServer(Number(planId), isLogin),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PlanContent />
    </HydrationBoundary>
  );
}
