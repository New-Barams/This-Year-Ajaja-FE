'use client';

import {
  Button,
  Icon,
  KakaoShareButton,
  ModalBasic,
  Popover,
  ReadOnlyPlan,
  TooltipButton,
} from '@/components';
import classNames from 'classnames';
import Link from 'next/link';
import NotPublic from './_components/NotPublic/NotPublic';
import SearchingPlan from './_components/SearchingPlan/SearchingPlan';
import usePlanPage from './hooks/usePlanPage';
import './index.scss';

export default function PlanIdPage({ params }: { params: { planId: string } }) {
  const {
    plan,
    planId,
    isMyPlan,
    isSearching,
    isAccessible,
    isEditable,
    currentURL,
    handleCopyLink,
    handleDeletePlan,
  } = usePlanPage(params.planId);

  return (
    <>
      <div className={classNames('plans-page')}>
        <div className="plans-page__main">
          <div className="plans-page__breadcrumb font-size-base color-origin-text-100">
            {isMyPlan ? (
              <Link href="/home">홈</Link>
            ) : (
              <Link href="/explore">둘러보기</Link>
            )}
            {'>'}
            <span>계획</span>
          </div>
          <div className="plans-page__content">
            {(() => {
              if (isSearching) {
                return <SearchingPlan />;
              } else if (!isAccessible) {
                return <NotPublic />;
              } else {
                return (
                  <ReadOnlyPlan isMine={isMyPlan} planData={{ ...plan }}>
                    {isEditable && (
                      <div className="plan__header--buttons">
                        <Link href={`/plans/edit/${planId}`}>수정</Link>|
                        <Popover.Main>
                          <Popover.Trigger>
                            <span>삭제</span>
                          </Popover.Trigger>
                          <Popover.ModalContent
                            renderModalContent={(onClickNo) => (
                              <ModalBasic
                                onClickYes={handleDeletePlan}
                                onClickNo={onClickNo}
                                confirmSentense="삭제 하기">
                                정말 해당 계획을 삭제하시겠습니까 ?
                              </ModalBasic>
                            )}
                          />
                        </Popover.Main>
                      </div>
                    )}
                  </ReadOnlyPlan>
                );
              }
            })()}
            {isMyPlan && (
              <div className="plans-page--share">
                <h2>공유하기</h2>
                <TooltipButton.Main optionsPosition="top">
                  <TooltipButton.Options>
                    <label className="font-size-xs" onClick={handleCopyLink}>
                      <Icon name="COPY" color="text-100" size="md" />
                      링크 복사
                    </label>
                    <label className="font-size-xs">
                      <KakaoShareButton linkURL={currentURL} />
                      카카오톡
                    </label>
                  </TooltipButton.Options>
                  <TooltipButton.Trigger>
                    <label>
                      <Icon name="SHARE" color="text-100" size="md" />
                      공유하기
                    </label>
                  </TooltipButton.Trigger>
                </TooltipButton.Main>
                {/*TODO  기존 공유버튼 삭제 예정 */}
                {/* <div className="plans-page--share--buttons">
                  <label className="font-size-xs" onClick={handleCopyLink}>
                    <Icon name="COPY" color="text-100" size="md" />
                    링크 복사
                  </label>
                  <label className="font-size-xs">
                    <KakaoShareButton linkURL={currentURL} />
                    카카오톡
                  </label>
                </div> */}
              </div>
            )}
          </div>
        </div>

        {isMyPlan && (
          <div className="plans-page__bottom">
            <div className={classNames('plans-page__bottom--buttons')}>
              <Link href={`/reminds/${planId}`}>
                <Button
                  background="primary"
                  color="white-100"
                  size="lg"
                  border={false}>
                  리마인드 보기
                </Button>
              </Link>
              <Link href={`/feedback/${planId}`}>
                <Button
                  background="primary"
                  color="white-100"
                  size="lg"
                  border={false}>
                  피드백 보기
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
