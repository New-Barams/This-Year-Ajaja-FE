import React, { useState } from 'react';
import FootPrintFilter from '../FootPrintFilter/FootPrintFilter';
import FootPrintList from '../FootPrintList/FootPrintList';

export type planType = {
  planTitle: string;
  planId: number;
};

export default function MyFootPrints() {
  const [year, setYear] = useState<number>(2024);
  const [plan, setPlan] = useState<planType>({
    planTitle: '모든 계획',
    planId: -1,
  });

  // Filter에서 검색 버튼을 누르면, setYear와 setPlan이 실행되어 year과 plan이 바뀌면
  // FootPrintList에 변경된 year와 plan이 전달될 것임
  return (
    <div>
      <FootPrintFilter year={year} setYear={setYear} setPlan={setPlan} />
      <FootPrintList year={year} plan={plan} />
    </div>
  );
}
