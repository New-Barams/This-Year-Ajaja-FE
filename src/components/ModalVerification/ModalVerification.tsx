'use client';

import { Button, Icon } from '@/components';
import { usePostSendVerificationMutation } from '@/hooks/apis/usePostSendVerificationMutation';
import { usePostVerifyMutation } from '@/hooks/apis/usePostVerifyMutation';
import { checkEmailValidation } from '@/utils/checkEmailValidation';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import './index.scss';

interface ModalVerificationProps {
  handleCloseModal: () => void;
  setVerifiedEmail?: () => void;
}
export default function ModalVerification({
  handleCloseModal,
  setVerifiedEmail,
}: ModalVerificationProps) {
  const {
    mutate: submitEmail,
    isError,
    isPending,
    isSuccess,
    error,
  } = usePostSendVerificationMutation();
  const {
    mutateAsync: submitCertification,
    isPending: isVerifyPending,
    isError: isVerifyError,
    error: verifyError,
    isSuccess: isVerifySuccess,
  } = usePostVerifyMutation();

  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [isValidCode, setIsValidCode] = useState<boolean>(true);

  useEffect(() => {
    if (error && error.response) {
      const status = error.response.status;
      if (status <= 400 || status >= 500) {
        throw error;
      }
    } else if (error) {
      throw error;
    }
    if (verifyError && verifyError.response) {
      const status = verifyError.response.status;
      if (status <= 400 || status >= 500) {
        throw verifyError;
      }
    } else if (verifyError) {
      throw verifyError;
    }
  }, [error, verifyError]);

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmitEmail = () => {
    const isValidate = checkEmailValidation(email);
    if (isValidate) {
      setIsValidEmail(true);
      submitEmail(email);
    } else {
      setIsValidEmail(false);
    }
  };
  const handleChangeCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    setCode(inputValue);
  };
  const handleSubmitCode = async () => {
    if (code.length == 6) {
      setIsValidCode(true);
      await submitCertification(code);
      setVerifiedEmail && setVerifiedEmail();
    } else {
      setIsValidCode(false);
    }
  };
  return (
    <div
      className={classNames(
        `modal-verification-wrapper`,
        'border-origin-primary',
        'background-origin-white-100',
      )}>
      <div
        className={classNames('modal-verification-wrapper__exit')}
        onClick={handleCloseModal}>
        <Icon name="CLOSE" color="gray-300" size="3xl" />
      </div>

      <div className={classNames(`modal-verification-wrapper__content`)}>
        <h1
          className={classNames(
            `font-size-2xl`,
            `color-origin-gray-300`,
            `modal-verification-wrapper__text`,
          )}>
          이메일 인증
        </h1>

        <div className="modal-verification-wrapper__items">
          <div className="modal-verification-wrapper__items--item">
            <input
              className="modal-verification-wrapper__items--input"
              type="email"
              onChange={handleChangeEmail}
              placeholder="이메일을 입력해주세요"
            />
            <Button
              size="md"
              border={false}
              color="white-100"
              background="primary"
              onClick={handleSubmitEmail}>
              인증코드 전송
            </Button>
          </div>
          <div className="font-size-xs modal-verification-wrapper__items--item--message">
            {!isValidEmail && (
              <span className="color-origin-primary">
                유효하지 않은 이메일입니다. 이메일을 확인해주세요
              </span>
            )}
            {isValidEmail && isPending && <span>코드 전송중...</span>}
            {isValidEmail && isError && (
              <span className="color-origin-primary ">
                {error?.response?.data.errorMessage}
              </span>
            )}
            {isValidEmail && isSuccess && (
              <span className="color-origin-green-300">
                이메일에서 인증코드를 확인해주세요
              </span>
            )}
          </div>
          <div className="modal-verification-wrapper__items--item">
            <input
              className="modal-verification-wrapper__items--input"
              placeholder="인증 코드를 입력해주세요"
              value={code}
              onChange={handleChangeCode}
            />
            <div className={classNames(!isSuccess && 'visible-hidden')}>
              <Button
                border={false}
                size="md"
                color="white-100"
                background="primary"
                onClick={handleSubmitCode}>
                인증코드 확인
              </Button>
            </div>
          </div>

          <div className="font-size-xs modal-verification-wrapper__items--item--message">
            {!isValidCode && (
              <span className="color-origin-primary">
                인증 코드가 유효하지 않습니다. 인증 코드를 확인해주세요
              </span>
            )}
            {isValidCode && isVerifyPending && <span>인증 코드 확인중...</span>}
            {isValidCode && isVerifySuccess && (
              <span className="color-origin-green-300">
                인증에 성공하셨습니다.
              </span>
            )}
            {isValidCode && isVerifyError && (
              <span className="color-origin-primary">
                {verifyError?.response?.data.errorMessage}
              </span>
            )}
          </div>
        </div>

        <Button
          disabled={!isVerifySuccess}
          background={isVerifySuccess ? 'primary' : 'gray-200'}
          color={'white-100'}
          size="md"
          border={true}
          onClick={handleCloseModal}>
          인증 완료
        </Button>
      </div>
    </div>
  );
}
