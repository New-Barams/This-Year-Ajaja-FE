'use client';

import { Button, Modal, WritableRemind } from '@/components';
import ModalExit from '@/components/Modal/ModalExit';
import WritablePlan from '@/components/WritablePlan/WritablePlan';
import { useEditPlanMutation } from '@/hooks/apis/useEditPlanMutation';
import { useGetPlanQuery } from '@/hooks/apis/useGetPlanQuery';
import { useGetRemindQuery } from '@/hooks/apis/useGetRemindQuery';
import { EditPlanData } from '@/types/apis/plan/EditPlan';
import { RemindItemType, RemindOptionType } from '@/types/components/Remind';
import { changeRemindTimeToNumber } from '@/utils/changeRemindTimeToNumber';
import { changeRemindTimeToString } from '@/utils/changeRemindTimeToString';
import { checkIsMyPlan } from '@/utils/checkIsMyPlan';
import { checkIsSeason } from '@/utils/checkIsSeason';
import { decideRemindDate } from '@/utils/decideRemindDate';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import './index.scss';

export default function EditPage({ params }: { params: { planId: string } }) {
  const { planId } = params;
  const router = useRouter();
  const { plan: planData } = useGetPlanQuery(Number(planId));
  const isMyPlan = checkIsMyPlan(planData.userId);
  useEffect(() => {
    if (!isMyPlan) {
      router.push('./home');
    }
  }, [isMyPlan, router]);

  const { remindData } = useGetRemindQuery(
    parseInt(planId, 10),
    checkIsSeason(),
  );

  const [title, setTitle] = useState(planData.title);
  const [description, setDescription] = useState(planData.description);
  const [tags, setTags] = useState<string[]>(planData.tags);
  const [isPublic, setPublic] = useState(planData.isPublic);
  const toggleIsPublic = () => {
    setPublic(!isPublic);
  };
  const [canAjaja, setCanAjaja] = useState(planData.canAjaja);
  const toggleCanAjaja = () => {
    setCanAjaja(!canAjaja);
  };

  const [isRemindOn, setIsRemindOn] = useState(remindData.isRemindable);
  const toggleIsRemindOn = () => {
    setIsRemindOn(!isRemindOn);
  };

  const [remindOptions, setRemindOptions] = useState<RemindOptionType>({
    TotalPeriod: remindData.remindTotalPeriod,
    Term: remindData.remindTerm,
    Date: remindData.remindDate,
    Time: changeRemindTimeToNumber(remindData.remindTime),
  });

  const handleChangeRemindOption = (
    optionKey: string,
    newOptionValue: number,
  ) => {
    setRemindOptions({
      ...remindOptions,
      [optionKey]: newOptionValue,
    });
  };

  const [remindMessageList, setRemindMessageList] = useState<RemindItemType[]>([
    ...remindData.sentRemindResponses.map((remindItem) => {
      return {
        date: {
          month: remindItem.remindMonth,
          day: remindItem.remindDate,
        },
        message: remindItem.remindMessage,
      };
    }),
    ...remindData.futureRemindResponses.map((remindItem) => {
      return {
        date: {
          month: remindItem.remindMonth,
          day: remindItem.remindDate,
        },
        message: remindItem.remindMessage,
      };
    }),
  ]);

  const handleChangeRemindMessage = (
    month: number,
    day: number,
    newMessage: string,
  ) => {
    setRemindMessageList((prevRemindMessageList) => {
      return prevRemindMessageList.map((item) => {
        if (item.date.month === month && item.date.day === day) {
          return { ...item, message: newMessage };
        }
        return item;
      });
    });
  };

  const [isExitModalOpen, setIsExitModalOpen] = useState(false);

  const fixRemindOptions = () => {
    const fixedRemindDate = decideRemindDate(
      remindOptions.TotalPeriod,
      remindOptions.Term,
      remindOptions.Date,
    );

    const newRemindMessageList: RemindItemType[] = [];
    fixedRemindDate?.forEach((newDate) => {
      newRemindMessageList.push({
        date: {
          month: newDate.month,
          day: newDate.day,
        },
        message: '',
      });
    });

    setRemindMessageList(newRemindMessageList);
  };

  const makeAllRemindMessageSame = useCallback(() => {
    setRemindMessageList((prevList) => {
      if (prevList.length > 1) {
        const firstMessage = prevList[0].message;
        return prevList.map((item) => ({ ...item, message: firstMessage }));
      }
      return prevList;
    });
  }, []);

  const isAllRemindMessageExists =
    remindMessageList.length > 0 &&
    remindMessageList.every((remindItem) => remindItem.message.length > 0);

  const isEditPossible =
    isAllRemindMessageExists && title.length !== 0 && description.length !== 0;

  const { mutate: editPlanAPI } = useEditPlanMutation(parseInt(planId, 10));

  const editPlan = () => {
    const editPlanData: EditPlanData = {
      title: title,
      description: description,
      remindTotalPeriod: remindOptions.TotalPeriod,
      remindTerm: remindOptions.Term,
      remindDate: remindOptions.Date,
      remindTime: changeRemindTimeToString(remindOptions.Time),
      isPublic: isPublic,
      canRemind: isRemindOn,
      canAjaja: canAjaja,
      tags: tags,
      messages: remindMessageList.map((messageItem) => {
        return messageItem.message;
      }),
    };

    editPlanAPI({ planId: parseInt(planId, 10), planData: editPlanData });
  };

  return (
    <div className={classNames('edit-page')}>
      <WritablePlan
        isEditPage={true}
        isPublic={isPublic}
        onToggleIsPublic={toggleIsPublic}
        title={title}
        description={description}
        onChangeTitle={setTitle}
        onChangeDescription={setDescription}
        tags={tags}
        changeTags={setTags}
        ajajas={planData.ajajas}
        isAjajaOn={planData.isPressAjaja}
        canAjaja={canAjaja}
        onToggleCanAjaja={toggleCanAjaja}
      />

      <WritableRemind
        isEditPage={true}
        isRemindOn={isRemindOn}
        toggleIsRemindOn={toggleIsRemindOn}
        remindOption={remindOptions}
        setRemindOption={handleChangeRemindOption}
        fixRemindOptions={fixRemindOptions}
        remindMessageList={remindMessageList}
        setRemindMessage={handleChangeRemindMessage}
        makeAllRemindMessageSame={makeAllRemindMessageSame}
        classNameList={['edit-page__remind']}
      />

      <div className={classNames('edit-page__button__container')}>
        <Link href={`/plans/${planId}`}>
          <Button
            background={isEditPossible ? 'primary' : 'gray-200'}
            color="white-100"
            size="lg"
            border={false}
            onClick={editPlan}
            disabled={!isEditPossible}>
            수정 완료
          </Button>
        </Link>
        <Button
          background="primary"
          color="white-100"
          size="lg"
          border={false}
          onClick={() => {
            setIsExitModalOpen(true);
          }}>
          나가기
        </Button>
      </div>

      {isExitModalOpen && (
        <Modal>
          <ModalExit
            exitLink={`/plans/${planId}`}
            closeModal={() => {
              setIsExitModalOpen(false);
            }}>
            수정 중인 계획이 있습니다. 정말 페이지를 나가시겠습니까 ?
          </ModalExit>
        </Modal>
      )}
    </div>
  );
}
