import classNames from 'classnames';
import React from 'react';
import FootprintItem from '../FootprintItem/FootprintItem';
import { planType } from '../MyFootPrints/MyFootPrints';
import './index.scss';

interface FootPrintListProps {
  year: number;
  plan: planType;
}

type FootPrintItemType = {
  id: number;
  iconNumber: number;
  title: string;
  createdAt: string;
  ajajas: number;
  tags: string[];
};

const dummyFootPrintList: FootPrintItemType[] = [
  {
    id: 1,
    iconNumber: 0,
    title: '발자취1',
    createdAt: '2024.04.22',
    ajajas: 1,
    tags: ['태그1', '태그2', '태그3', '태그4', '태그5'],
  },
  {
    id: 2,
    iconNumber: 1,
    title: '발자취2',
    createdAt: '2024.04.22',
    ajajas: 2,
    tags: ['태그1', '태그2', '태그3', '태그4', '태그5'],
  },
  {
    id: 3,
    iconNumber: 1,
    title: '발자취3',
    createdAt: '2024.04.22',
    ajajas: 3,
    tags: ['태그1', '태그2', '태그3', '태그4', '태그5'],
  },
  {
    id: 4,
    iconNumber: 0,
    title: '발자취4',
    createdAt: '2024.04.22',
    ajajas: 1,
    tags: ['태그1', '태그2', '태그3', '태그4', '태그5'],
  },
  {
    id: 5,
    iconNumber: 1,
    title: '발자취5',
    createdAt: '2024.04.22',
    ajajas: 2,
    tags: ['태그1', '태그2', '태그3', '태그4', '태그5'],
  },
  {
    id: 6,
    iconNumber: 1,
    title: '발자취6',
    createdAt: '2024.04.22',
    ajajas: 3,
    tags: ['태그1', '태그2', '태그3', '태그4', '태그5'],
  },
];

export default function FootPrintList({ year, plan }: FootPrintListProps) {
  // TODO: prop으로 받은 year과 plan에 해당하는 발자취 list들을 서버로부터 받아온다.
  // - plan.planId === -1 => 모든 계획일 것
  // - plan.planId === -2 => 해당 year에 해당하는 계획이 없는 것

  return (
    <ul className={classNames('footprint-list')}>
      {dummyFootPrintList.map((item) => {
        return (
          <FootprintItem
            key={item.id}
            id={item.id}
            iconNumber={item.iconNumber}
            title={item.title}
            createdAt={item.createdAt}
            ajajas={item.ajajas}
            tags={item.tags}
          />
        );
      })}
      <div>{`${year}와 ${plan}에 해당하는 FootPrintList`}</div>
    </ul>
    // TODO: `${year}와 ${plan.planTitle}에 해당하는 FootPrintList 출력`
  );
}
