import React from 'react';
import { planType } from '../MyFootPrints/MyFootPrints';

interface FootPrintListProps {
  year: number;
  plan: planType;
}

export default function FootPrintList({ year, plan }: FootPrintListProps) {
  // TODO: prop으로 받은 year과 plan에 해당하는 발자취 list들을 서버로부터 받아온다.
  // - plan.planId === -1 => 모든 계획일 것
  // - plan.planId === -2 => 해당 year에 해당하는 계획이 없는 것

  return (
    <ul>{`${year}와 ${plan.planTitle}에 해당하는 FootPrintList 출력`}</ul>

    // TODO: footPrintList.map((item)=>{return <FootPrintItem props={item. ~}/>})
  );
}
