import { ajajaToast } from '@/components/Toaster/customToast';
import { useEditPlanMutation } from '@/hooks/apis/useEditPlanMutation';
import { useGetPlanQuery } from '@/hooks/apis/useGetPlanQuery';
import { useWritablePlan } from '@/hooks/useWritablePlan';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function usePlanEditPage(planId: string) {
  const router = useRouter();
  const { plan: planData } = useGetPlanQuery(Number(planId), true);
  const { mutate: editPlan } = useEditPlanMutation(Number(planId));
  const isMyPlan = planData.writer.owner;

  useEffect(() => {
    if (!isMyPlan) {
      router.replace('/home');
    }
  }, [isMyPlan, router]);
  const {
    nextTextAreaRef,
    planContent,
    handleAddTag,
    handleChangeCanAjaja,
    handleChangeDescription,
    handleChangeIsPublic,
    handleChangeTitle,
    handleRemoveTag,
    handleChangeIconNumber,
  } = useWritablePlan(planData);

  const handleEditPlan = () => {
    editPlan(
      { planId: Number(planId), planData: planContent },
      {
        onError: () => {
          ajajaToast.error('수정에 실패했습니다.');
        },
        onSuccess: () => {
          router.replace(`/plans/${planId}`);
        },
      },
    );
  };

  return {
    planId,
    nextTextAreaRef,
    planContent,
    planData,
    handleAddTag,
    handleChangeCanAjaja,
    handleChangeDescription,
    handleChangeIconNumber,
    handleChangeIsPublic,
    handleChangeTitle,
    handleEditPlan,
    handleRemoveTag,
  };
}
