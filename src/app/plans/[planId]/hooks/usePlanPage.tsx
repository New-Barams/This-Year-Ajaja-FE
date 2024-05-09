'use client';

import { ajajaToast } from '@/components/Toaster/customToast';
import { useDeletePlanMutation } from '@/hooks/apis/useDeletePlanMutation';
import { useGetPlanQuery } from '@/hooks/apis/useGetPlanQuery';
import { useIsLogIn } from '@/hooks/useIsLogIn';
import { isMyPlanStore } from '@/stores/isMyPlanStore';
import { checkIsSeason } from '@/utils/checkIsSeason';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

export default function usePlanPage() {
  const router = useRouter();
  const { planId } = useParams<{ planId: string }>();
  const isSeason = checkIsSeason();
  const { isLogin } = useIsLogIn();
  const { plan, isPending } = useGetPlanQuery(Number(planId), isLogin);
  const [currentURL, setCurrentURL] = useState<string>('');
  const { mutate: deletePlanAPI } = useDeletePlanMutation();
  const setIsMyPlanStore = useSetRecoilState(isMyPlanStore);
  const isMyPlan = plan.writer.owner;

  const isAccessible = isMyPlan || plan.public;
  const isEditable = isMyPlan && isSeason;

  useEffect(() => {
    const current = window.location.href;
    setCurrentURL(current);
    setIsMyPlanStore(isMyPlan);
    return () => {
      setIsMyPlanStore(false);
    };
  }, [setIsMyPlanStore, isMyPlan]);

  const handleDeletePlan = () => {
    deletePlanAPI(parseInt(planId, 10));
    router.push('/home');
  };
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(currentURL);
    ajajaToast.success('링크가 복사되었습니다.');
  };

  return {
    plan,
    planId,
    isPending,
    isAccessible,
    isEditable,
    isMyPlan,
    currentURL,
    handleCopyLink,
    handleDeletePlan,
  };
}
