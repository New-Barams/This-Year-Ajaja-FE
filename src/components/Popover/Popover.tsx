'use client';

import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Modal } from '..';

const contextDefaultValue = {
  isModalOpen: false,
  handleOpenModal: () => {},
  handleCloseModal: () => {},
};

//popover 안에서 공유할 값을 context를 통해서 공유한다.
const PopoverContext = createContext<{
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}>(contextDefaultValue);

interface MainProps {
  children: ReactNode;
}
const Main = ({ children }: MainProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <PopoverContext.Provider
      value={{
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
      }}>
      {children}
    </PopoverContext.Provider>
  );
};

interface TriggerProps {
  className?: string;
  children: ReactNode;
}
//popover의 trigger역할
const Trigger = ({ className, children }: TriggerProps) => {
  const contextValue = useContext(PopoverContext);
  return (
    <div className={className} onClick={contextValue.handleOpenModal}>
      {children}
    </div>
  );
};
interface ModalContentProps {
  renderModalContent: (onClickNo: () => void) => ReactElement;
}
//실제 모달이 들어올 컴포넌트 현재 modal 구현상 render함수를 받고 있다.
const ModalContent = ({ renderModalContent }: ModalContentProps) => {
  const contextValue = useContext(PopoverContext);
  const $portalContainer = document.querySelector(
    '.global-frame-children',
  ) as HTMLElement;
  return (
    <>
      {contextValue.isModalOpen &&
        $portalContainer &&
        createPortal(
          <Modal>{renderModalContent(contextValue.handleCloseModal)}</Modal>,
          $portalContainer,
        )}
    </>
  );
};

export { ModalContent, Trigger, Main };
