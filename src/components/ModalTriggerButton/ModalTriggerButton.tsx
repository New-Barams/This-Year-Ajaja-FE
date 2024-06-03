'use client';

import React, { ReactElement, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '..';

interface ModalTriggerButton {
  className?: string; //외부에서 스타일적용을 위해서 className을 받아준다.
  children: ReactNode;
  container: HTMLDivElement | null;
  renderModalContent: (onClickNo: () => void) => ReactElement; //렌더링해야하는 컴포넌트를 반환하는 함수
}

export default function ModalTriggerButton({
  className,
  renderModalContent,
  container,
  children,
}: ModalTriggerButton) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); //모달 상태
  // 모달 여는 함수
  const handleSetIsOpen = () => {
    setIsModalOpen(true);
  };
  // 모달 닫는 함수
  const handleSetIsClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={className} onClick={handleSetIsOpen}>
        {children}
      </div>
      {isModalOpen &&
        createPortal(
          <Modal>{renderModalContent(handleSetIsClose)}</Modal>,
          container!,
        )}
    </>
  );
}
