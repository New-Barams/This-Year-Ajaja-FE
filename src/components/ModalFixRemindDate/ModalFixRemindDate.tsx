import classNames from 'classnames';
import React from 'react';
import { Modal, ModalBasic } from '..';
import './index.scss';

interface ModalFixRemindDateProps {
  fixedMonthList: number[];
  fixedDate: number;
  onClickYes: () => void;
  onClickNo: () => void;
}

export default function ModalFixRemindDate({
  fixedMonthList,
  fixedDate,
  onClickYes,
  onClickNo,
}: ModalFixRemindDateProps) {
  return (
    <Modal>
      <ModalBasic
        onClickYes={onClickYes}
        onClickNo={onClickNo}
        confirmSentense="진행하기">
        <div className={classNames(['fix-remind-modal'])}>
          <div
            className={classNames([
              'fix-remind-modal__title',
              'font-size-base',
            ])}>
            <p>
              2024년 총{' '}
              <span className={classNames(['color-origin-primary'])}>
                {fixedMonthList.length}
              </span>
              번
            </p>
            <p>
              해당 월{' '}
              <span className={classNames(['color-origin-primary'])}>
                {fixedDate}
              </span>
              일마다 리마인드를 받게 됩니다.
            </p>
          </div>

          <ul className={classNames(['fix-remind-modal__month-list'])}>
            {fixedMonthList.map((month) => {
              return (
                <li
                  key={month}
                  className={classNames(['fix-remind-modal__month-item'])}>
                  {month}월
                </li>
              );
            })}
          </ul>

          <p
            className={classNames([
              'fix-remind-modal__warning',
              'font-size-xs',
              'color-origin-primary',
            ])}>
            {
              '단, 선택된 날짜가 선택된 월에 없으면 해당 월의 말일에 리마인드를 받습니다. ex) 2월 31일 => 2월 28일'
            }
          </p>

          <p
            className={classNames([
              'fix-remind-modal__proceed',
              ,
              'font-size-md',
            ])}>
            이대로 진행하시겠습니까 ?
          </p>
        </div>
      </ModalBasic>
    </Modal>
  );
}
