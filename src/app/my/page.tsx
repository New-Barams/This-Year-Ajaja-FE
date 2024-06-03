'use client';

import {
  Button,
  Icon,
  ModalBasic,
  ModalVerification,
  Popover,
} from '@/components';
import Link from 'next/link';
import ModalRemindWay from './_components/ModalRemindWay/ModalRemindWay';
import useMyPage from './hooks/useMyPage';
import './index.scss';

export default function MyPage() {
  const {
    receiveType,
    nickname,
    remindEmail,
    defaultEmail,
    emailVerified,
    isChangeReceiveTypePending,
    handleLogOut,
    handleWithdrawal,
    handleSetVerifiedEmail,
    handleChangeNickName,
    handleChangeReceiveType,
  } = useMyPage();

  return (
    <div className="my-page__wrapper">
      <h1 className="my-page__header font-size-xl">마이페이지</h1>
      <div className="my-page__content">
        <h1 className="my-page__welcome-text font-size-xl">
          <span>안녕하세요, </span>
          <span>
            <span className="color-origin-primary">{nickname}</span>님!
          </span>
        </h1>
        <div className="my-page__nick-name">
          <h2 className="my-page__nick-name--label font-size-lg">닉네임</h2>
          <div className="my-page__nick-name--content">
            <div className="my-page__nick-name--content--main">
              {nickname}
              <button onClick={handleChangeNickName}>
                <Icon
                  name="REFRESH"
                  color="text-100"
                  size="xl"
                  isFilled={true}
                />
              </button>
            </div>
            <div className="my-page__nick-name--content--alert font-size-xs">
              새로고침 버튼 클릭시 닉네임이 랜덤으로 변경됩니다.
            </div>
          </div>
        </div>
        <div className="my-page__account">
          <h2 className="my-page__account--label font-size-lg">
            연결된 계정 및 이메일
          </h2>
          <div className="my-page__account--content font-size-base">
            <div className="my-page__account--content--kakao ">
              <h3>카카오톡 : {defaultEmail} </h3>
            </div>
            <div className="my-page__account--content--email">
              <h3>
                이메일 :{' '}
                {emailVerified ? remindEmail : '이메일 인증이 필요합니다.'}{' '}
              </h3>
            </div>
          </div>
          <Popover.Main>
            <Popover.Trigger>
              <Button border={false} background="primary" color="white-100">
                이메일 {emailVerified ? '변경' : '인증'}
              </Button>
            </Popover.Trigger>
            <Popover.ModalContent
              renderModalContent={(onClickNo) => (
                <ModalVerification
                  handleCloseModal={onClickNo}
                  setVerifiedEmail={handleSetVerifiedEmail}
                  defaultValue={emailVerified ? '' : defaultEmail}>
                  이메일 {emailVerified ? '변경' : '인증'}
                </ModalVerification>
              )}
            />
          </Popover.Main>
        </div>
        <div className="my-page__remindway">
          <h2 className="my-page__remindway--label font-size-lg">
            리마인드 및 응원 메시지
          </h2>
          <div className="my-page__remindway--content font-size-base">
            {receiveType === 'both' ? (
              <p className="color-origin-primary">
                이메일<span className="color-origin-text-100">과</span> 카카오톡
              </p>
            ) : (
              <span className="color-origin-primary">
                {receiveType === 'email' ? '이메일' : '카카오톡'}
              </span>
            )}
            을 통해서 리마인드 및 응원 메시지를 받고 있어요
          </div>
          <Popover.Main>
            <Popover.Trigger>
              <Button border={false} background="primary" color="white-100">
                알림 방식 변경
              </Button>
            </Popover.Trigger>
            <Popover.ModalContent
              renderModalContent={(onClickNo) => (
                <ModalRemindWay
                  isVerified={emailVerified}
                  confirmSentence="변경하기"
                  isPending={isChangeReceiveTypePending}
                  receiveType={receiveType}
                  onClickYes={handleChangeReceiveType}
                  onClickNo={onClickNo}>
                  알림 방식 변경
                </ModalRemindWay>
              )}
            />
          </Popover.Main>
        </div>
        <div className="my-page__etc font-size-base">
          <Link
            className="my-page__etc--notice color-origin-text-100"
            href={'/notice'}>
            공지사항
          </Link>
          <Popover.Main>
            <Popover.Trigger>
              <button className="my-page__etc--logout color-origin-text-100">
                로그아웃
              </button>
            </Popover.Trigger>
            <Popover.ModalContent
              renderModalContent={(onClickNo) => (
                <ModalBasic
                  onClickNo={onClickNo}
                  onClickYes={handleLogOut}
                  confirmSentense="로그아웃 하기">
                  로그아웃 하시겠습니까?
                </ModalBasic>
              )}
            />
          </Popover.Main>
          <Popover.Main>
            <Popover.Trigger>
              <button className="my-page__etc--withdrawal color-origin-text-300">
                회원 탈퇴
              </button>
            </Popover.Trigger>
            <Popover.ModalContent
              renderModalContent={(onClickNo) => (
                <ModalBasic
                  onClickYes={handleWithdrawal}
                  onClickNo={onClickNo}
                  confirmSentense="회원탈퇴 하기">
                  정말 회원 탈퇴를 진행 하시겠습니까? 탈퇴시 모든 정보가
                  삭제됩니다.
                </ModalBasic>
              )}
            />
          </Popover.Main>
        </div>
      </div>
    </div>
  );
}
