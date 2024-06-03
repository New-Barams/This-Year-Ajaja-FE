'use client';

import { useDebounce } from '@/hooks/useDebounce';
import classNames from 'classnames';
import React from 'react';
import { useState } from 'react';
import { IconSwitchButton } from '..';
import './index.scss';

type ToggleName = 'public' | 'ajaja' | 'remind';

const toggleText = {
  public: {
    on: '계획 공개',
    off: '계획 비공개',
  },
  ajaja: {
    on: '월요일 18:00 마다 응원 메세지 알림 활성화',
    off: '응원 메세지 알림 비활성화',
  },
  remind: {
    on: '리마인드 알림 활성화',
    off: '리마인드 알림 비활성화',
  },
};

interface DebounceSwitchButtonProps {
  defaultIsOn: boolean;
  submitToggleAPI: () => void;
  toggleName: ToggleName;
}

export default function DebounceSwitchButton({
  defaultIsOn,
  submitToggleAPI,
  toggleName,
}: DebounceSwitchButtonProps) {
  const [isOn, setIsOn] = useState(defaultIsOn);
  const [originalIsOn, setOriginalIsOn] = useState(defaultIsOn);

  const toggleIsOn = () => {
    setIsOn(!isOn);
  };

  const submitIfReallyChanged = () => {
    if (isOn !== originalIsOn) {
      submitToggleAPI(); // TODO: 여기서 만약 실패하면 아래 isOn은 바뀌면 안되는 거 아닌가?
      setOriginalIsOn(isOn);
    }
  };

  useDebounce(submitIfReallyChanged, 500, [isOn]);

  return (
    <div className={classNames('debounce-switch')}>
      <IconSwitchButton
        onIconName={toggleName === 'public' ? 'PLAN_OPEN' : 'NOTIFICATION_ON'}
        offIconName={
          toggleName === 'public' ? 'PLAN_CLOSE' : 'NOTIFICATION_OFF'
        }
        onClick={toggleIsOn}
        isActive={isOn}
      />
      <span className={classNames('debounce-switch__text font-size-xs')}>
        {isOn ? toggleText[toggleName].on : toggleText[toggleName].off}
      </span>
    </div>
  );
}
