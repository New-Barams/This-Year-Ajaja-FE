'use client';

import { useModalClose } from '@/hooks';
import classNames from 'classnames';
import {
  ReactElement,
  createContext,
  useContext,
  useRef,
  useState,
} from 'react';
import './index.scss';

//TooltipButton컴포넌트 내에서 공유할 상태, 함수
const contextDefaultValue = {
  isOpen: false, // 툴팁 열림 여부
  handleSetIsOpen: () => {}, //툴팁 상태 변경 함수
  handleCloseTooltip: () => {}, //툴팁 닫기 함수
  optionsPosition: 'top' as Position, //Options컴포넌트 위치(열림 방향을 위해서 필요)
};

type Position = 'top' | 'bottom';

const TooltipButtonContext = createContext<{
  isOpen: boolean;
  handleSetIsOpen: () => void;
  handleCloseTooltip: () => void;
  optionsPosition: Position;
}>(contextDefaultValue);

interface MainProps {
  className?: string; // 위치조정이이나, css 스탕일링을 위한 className
  children: ReactElement[];
  optionsPosition: Position;
}

const Main = ({ children, className, optionsPosition }: MainProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseTooltip = () => {
    setIsOpen(false);
  };
  const handleSetIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames('tooltip-button__main', className)}>
      <TooltipButtonContext.Provider
        value={{
          handleCloseTooltip,
          optionsPosition,
          isOpen,
          handleSetIsOpen,
        }}>
        {children}
      </TooltipButtonContext.Provider>
    </div>
  );
};

interface TriggerProps {
  children: ReactElement;
  className?: string;
}
//열고 닫힘 trigger 역할을 할 컴푸넌트 children을 넣얼줄때 외부에서 직접 스타일링 가능, 그외 부분 클릭시 Tooltip 닫힘
const Trigger = ({ children, className }: TriggerProps) => {
  const { handleSetIsOpen, handleCloseTooltip } =
    useContext(TooltipButtonContext);
  const triggerRef = useRef(null);
  useModalClose(triggerRef, handleCloseTooltip);
  return (
    <button
      ref={triggerRef}
      onClick={handleSetIsOpen}
      className={classNames(className, 'tooltip-button__trigger')}>
      {children}
    </button>
  );
};

interface OptionsProps {
  className?: string;
  children: ReactElement[] | ReactElement;
}
//열렸을때 보여줄 아이템들
const Options = ({ className, children }: OptionsProps) => {
  const { isOpen, optionsPosition } = useContext(TooltipButtonContext);
  return (
    <ul
      className={classNames(
        className,
        'tooltip-button__list',
        `position-${optionsPosition}`,
        isOpen ? 'open' : 'close',
      )}>
      {Array.isArray(children) ? (
        children.map((component, index) => (
          <li
            data-order={index + 1}
            className={classNames(
              'tooltip-button__list__item',
              isOpen ? 'open' : 'close',
            )}
            key={index}>
            {component}
          </li>
        ))
      ) : (
        <li className="tooltip-button__list__item ">{children}</li>
      )}
    </ul>
  );
};

export { Main, Options, Trigger };
