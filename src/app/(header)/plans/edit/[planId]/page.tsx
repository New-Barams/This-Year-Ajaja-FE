'use client';

import {
  AjajaButton,
  Button,
  DeletableTag,
  HelpButton,
  IconSwitchButton,
  Modal,
  ModalSelectIcon,
  PlanInput,
  TagInput,
} from '@/components';
import { planIcons } from '@/constants/planIcons';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import usePlanEditPage from './hooks/usePlanEditPage';
import './index.scss';

export default function EditPage({ params }: { params: { planId: string } }) {
  const {
    planId,
    nextTextAreaRef,
    isSelectIconModalOpen,
    planContent,
    planData,
    setIsSelectIconModalOpen,
    handleAddTag,
    handleChangeCanAjaja,
    handleChangeDescription,
    handleChangeIconNumber,
    handleChangeIsPublic,
    handleChangeTitle,
    handleEditPlan,
    handleRemoveTag,
  } = usePlanEditPage(params.planId);

  return (
    <div className={classNames('edit-plan-content')}>
      <div className="edit-plan-content__breadcrumb font-size-base color-origin-text-100">
        <Link href="/home">홈</Link>
        &gt;
        <Link href={`/plans/${planId}`}>계획</Link>
        &gt;
        <span>계획 수정</span>
      </div>
      <div className="edit-plan-content__main">
        <div className="edit-plan-content__icon">
          <button
            onClick={() => {
              setIsSelectIconModalOpen(true);
            }}>
            <Image
              src={`/animal/${planIcons[planContent.iconNumber]}.png`}
              alt={`${planIcons[planContent.iconNumber]}`}
              width={50}
              height={50}
              priority
            />
          </button>
          <span className="font-size-xs">아이콘을 클랙해 변경할 수 있어요</span>
        </div>
        <div className="edit-plan-content__plan">
          <PlanInput
            classNameList={['create-plan-content__plan--title']}
            editable={true}
            kind="title"
            placeholder="어떤 계획을 가지고 계신가요?"
            onChangeInput={handleChangeTitle}
            maxLength={20}
            textInput={planContent.title}
            nextTextAreaRef={nextTextAreaRef}
          />

          <PlanInput
            classNameList={['create-plan-content__plan--description']}
            editable={true}
            kind="content"
            placeholder="계획에 대해서 자세히 설명해주세요!"
            onChangeInput={handleChangeDescription}
            maxLength={250}
            textInput={planContent.description}
            nextTextAreaRef={nextTextAreaRef}
          />
        </div>

        <div className={classNames('edit-plan-content__tag')}>
          <div className="edit-plan-content__tag--input">
            <TagInput
              disabled={planContent.tags.length === 5}
              onSubmit={handleAddTag}
              placeholder="태그를 입력해주세요!"
            />
            <span
              className={classNames(
                'counter',
                'font-size-xs',
                planContent.tags.length === 5 && 'color-origin-primary',
              )}>{`(${planContent.tags.length}/5)`}</span>
          </div>

          <div className="edit-plan-content__tag--tags">
            {planContent.tags.map((tag, index) => (
              <DeletableTag
                key={index}
                onClick={() => {
                  handleRemoveTag(tag);
                }}>
                {tag}
              </DeletableTag>
            ))}
          </div>
          <AjajaButton
            ajajaCount={planData.ajajas}
            isFilled={planData.writer.ajajaPressed}
            disabled
          />
        </div>
        <div className="edit-plan-content__switches">
          <div className={classNames('edit-plan-content__switches--public')}>
            <IconSwitchButton
              onIconName="PLAN_OPEN"
              offIconName="PLAN_CLOSE"
              isActive={planContent.isPublic}
              onClick={() => {
                handleChangeIsPublic(!planContent.isPublic);
              }}
            />
            <span className={classNames('font-size-xs')}>
              {planContent.isPublic ? '계획 공개' : '계획 비공개'}
            </span>
            <HelpButton
              helpText={`계획 공개를 하면 둘러보기에서\n모든 사람들이 볼 수 있어요.`}
            />
          </div>

          <div className={classNames('edit-plan-content__switches--can-ajaja')}>
            <IconSwitchButton
              onIconName="NOTIFICATION_ON"
              offIconName="NOTIFICATION_OFF"
              isActive={planContent.canAjaja}
              onClick={() => {
                handleChangeCanAjaja(!planContent.canAjaja);
              }}
            />
            <span className={classNames('font-size-xs')}>
              {planContent.canAjaja
                ? '매주 월요일 18:00시 마다 응원 메세지 알림 활성화'
                : '응원 메세지 알림 비활성화'}
            </span>
            <HelpButton
              helpText={`매주 몇 명의 새로운 사람들이 내 계획에\n아좌좌를 눌러 응원했는지 알려드려요.`}
              textPosition={planContent.canAjaja ? 'top-left' : 'top'}
            />
          </div>
        </div>
      </div>

      <div className="edit-plan-content__bottom">
        <Button
          color="white-100"
          background="primary"
          onClick={handleEditPlan}
          border={false}>
          수정완료
        </Button>
        <Link href={`/plans/${planId}`}>
          <Button color="primary" background="white-100" border>
            돌아가기
          </Button>
        </Link>
      </div>

      {isSelectIconModalOpen && (
        <Modal>
          <ModalSelectIcon
            setIconNumber={handleChangeIconNumber}
            closeModal={() => {
              setIsSelectIconModalOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
