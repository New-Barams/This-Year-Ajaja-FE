'use client';

import classNames from 'classnames';
import { useState } from 'react';
import './index.scss';

export default function Tab() {
  const [currentYearTab, setCurrentYearTab] = useState(0);
  const [currentSortTab, setCurrentSortTab] = useState(0);

  const yearMenu = [
    { name: '새해' },
    {
      name: '지난해',
    },
  ];
  const sortMenu = [{ name: '최신순' }, { name: '인기순' }];

  const selectYearMenuHandler = (index: number) => {
    setCurrentYearTab(index);
  };
  const selectSortMenuHandler = (index: number) => {
    setCurrentSortTab(index);
  };
  return (
    <div className={classNames('tab__wrapper')}>
      <div className={classNames('tab__wrapper-year')}>
        <div className={classNames('tab__year-menu')}>
          {yearMenu.map((el, index) => {
            return (
              <li
                key={index}
                className={classNames(
                  'tab__year-menu--align',
                  index === currentYearTab
                    ? 'tab__year-menu--focused'
                    : 'tab__year-menu--normal',
                )}
                onClick={() => selectYearMenuHandler(index)}>
                {el.name}
                <div
                  className={classNames(
                    'tab__year-menu--underline',
                    index === currentYearTab
                      ? 'background-origin-primary'
                      : 'background-origin-orange-200',
                  )}
                />
              </li>
            );
          })}
        </div>
      </div>
      <div
        className={classNames('tab__line', 'background-origin-orange-200')}
      />
      <div className={classNames('tab__wrapper-sort', 'font-size-sm')}>
        {sortMenu.map((el, index) => {
          return (
            <>
              {!!index && (
                <p className={classNames('color-origin-gray-200')}>|</p>
              )}
              <li
                key={index}
                className={classNames(
                  'tab__sort-menu--align',
                  index === currentSortTab
                    ? 'tab__sort-menu--focused'
                    : 'tab__sort-menu--normal',
                )}
                onClick={() => selectSortMenuHandler(index)}>
                {el.name}
              </li>
            </>
          );
        })}
      </div>
    </div>
  );
}
