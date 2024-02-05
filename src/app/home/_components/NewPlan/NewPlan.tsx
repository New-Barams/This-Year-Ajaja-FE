import { Icon } from '@/components';
import { checkIsSeason } from '@/utils/checkIsSeason';
import classNames from 'classnames';
import Link from 'next/link';
import { useNewPlan } from '../hooks';
import './index.scss';

export default function NewPlan() {
  const { canMakeNewPlan } = useNewPlan();
  return (
    <>
      <div className={classNames('new-plan__servey')}>
        <p>서비스를 잘 이용하고 계신가요?</p>
        <a
          href="https://forms.gle/VW5xBbAErQWqmdxv6"
          className={classNames('color-origin-primary', 'new-plan__servey-a')}>
          서비스 만족도 조사 하러가기
        </a>
      </div>

      <Link
        href={checkIsSeason() && canMakeNewPlan ? '/create' : {}}
        className={classNames('new-plan__wrapper')}
        style={{
          cursor: checkIsSeason() && canMakeNewPlan ? 'pointer' : 'default',
        }}>
        {checkIsSeason() ? (
          <div
            className={classNames('new-plan__add', 'border-round', {
              'background-origin-primary': canMakeNewPlan,
              'background-origin-secondary': !canMakeNewPlan,
              'color-origin-background': !canMakeNewPlan,
            })}>
            {canMakeNewPlan ? (
              <Icon name="PLUS" color="background" size="xl" />
            ) : (
              <>
                <p>생성할 수 있는 계획의 수가 최대입니다.</p>
                <p>기존 계획을 삭제해야만 새로 생성이 가능합니다.</p>
              </>
            )}
          </div>
        ) : (
          <div
            className={classNames(
              'new-plan__add',
              'color-origin-background',
              'border-round',
              'background-origin-secondary',
            )}>
            <p>[작성 시즌 종료]</p>
            <p>내년에 만나요!</p>
          </div>
        )}
      </Link>
    </>
  );
}
