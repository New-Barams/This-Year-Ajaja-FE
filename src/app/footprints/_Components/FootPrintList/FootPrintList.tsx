import React from 'react';
import { planType } from '../MyFootPrints/MyFootPrints';

interface FootPrintListProps {
  year: number;
  plan: planType;
}

export default function FootPrintList({ year, plan }: FootPrintListProps) {
  return (
    <div>{`${year}와 ${plan.planTitle}에 해당하는 FootPrintList 출력`}</div>
  );
}
