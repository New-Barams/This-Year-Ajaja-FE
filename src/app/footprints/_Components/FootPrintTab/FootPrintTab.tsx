import classNames from 'classnames';
import React from 'react';
import './index.scss';

interface FootPrintTabProps {
  isMyFootPrintsTab: boolean;
  setMyFootPrintsTab: () => void;
  setAllFootPrintsTab: () => void;
}

const TAB_MENU = {
  MY: '내 발자취',
  ALL: '둘러보기',
};

export default function FootPrintTab({
  isMyFootPrintsTab,
  setMyFootPrintsTab,
  setAllFootPrintsTab,
}: FootPrintTabProps) {
  // TODO: isMyFootPrintsTab이 true => 내 발자취, false => 둘러보기 표시

  const handleClickMyFootPrintsTab = () => {
    if (!isMyFootPrintsTab) {
      setMyFootPrintsTab();
    }
  };

  const handleClickAllFootPrintsTab = () => {
    if (isMyFootPrintsTab) {
      setAllFootPrintsTab();
    }
  };

  return (
    <div className={classNames('footprint-tab')}>
      <div
        className={classNames(
          'footprint-tab__menu',
          'font-size-base',
          isMyFootPrintsTab
            ? 'footprint-tab--focused'
            : 'footprint-tab--normal',
        )}
        onClick={handleClickMyFootPrintsTab}>
        {TAB_MENU.MY}
        <div
          className={classNames('footprint-tab__underline', {
            'footprint-tab__underline--focused': isMyFootPrintsTab,
          })}
        />
      </div>
      <div
        className={classNames(
          'footprint-tab__menu',
          'font-size-base',
          !isMyFootPrintsTab
            ? 'footprint-tab--focused'
            : 'footprint-tab--normal',
        )}
        onClick={handleClickAllFootPrintsTab}>
        {TAB_MENU.ALL}
        <div
          className={classNames('footprint-tab__underline', {
            'footprint-tab__underline--focused': !isMyFootPrintsTab,
          })}
        />
      </div>
    </div>
  );
}
