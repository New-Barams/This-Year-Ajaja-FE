import { FOOTPRINT_PLAN } from '@/constants';
import classNames from 'classnames';
import React, { useState } from 'react';
import FootPrintFilter from '../FootPrintFilter/FootPrintFilter';
import FootPrintList from '../FootPrintList/FootPrintList';
import './index.scss';

export type planType = {
  planTitle: string;
  planId: number;
};

export default function MyFootPrints() {
  const [year, setYear] = useState<number>(2024);
  const [plan, setPlan] = useState<planType>(FOOTPRINT_PLAN.ALL_PLAN);

  // Filter에서 검색 버튼을 누르면, setYear와 setPlan이 실행되어 year과 plan이 바뀌면
  // FootPrintList에 변경된 year와 plan이 전달될 것임
  return (
    <div className={classNames('my-footprints')}>
      <FootPrintFilter setYear={setYear} setPlan={setPlan} />
      <FootPrintList year={year} plan={plan} />
    </div>
  );
}
