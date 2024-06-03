'use client';

import { Icon, SwitchButton } from '@/components';
import './index.scss';

type OnIconName = 'NOTIFICATION_ON' | 'PLAN_OPEN';
type OffIconName = 'NOTIFICATION_OFF' | 'PLAN_CLOSE';
interface IconSwitchButtonProps {
  onIconName: OnIconName;
  offIconName: OffIconName;
  onClick: () => void;
  isActive: boolean;
}
export default function IconSwitchButton({
  onIconName,
  offIconName,
  onClick,
  isActive = false,
}: IconSwitchButtonProps) {
  return (
    <SwitchButton onClick={onClick} isOn={isActive}>
      <div className="icon__wrapper">
        <Icon
          name={offIconName}
          color={isActive ? 'white-100' : 'gray-100'}
          size="sm"
        />

        <Icon
          name={onIconName}
          color={isActive ? 'primary' : 'white-100'}
          size="sm"
        />
      </div>
    </SwitchButton>
  );
}
