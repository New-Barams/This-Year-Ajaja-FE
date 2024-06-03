'use client';

import { COLOR } from '@/constants';
import { useMyFootPrintsQuery } from '@/hooks/apis/useMyFootPrintsQuery';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FadeLoader } from 'react-spinners';
import FootprintItem from '../FootprintItem/FootprintItem';
import { planType } from '../MyFootPrints/MyFootPrints';
import './index.scss';

interface FootPrintListProps {
  year: number;
  plan: planType;
}

export default function FootPrintList({ year, plan }: FootPrintListProps) {
  // TODO: prop으로 받은 year과 plan에 해당하는 발자취 list들을 서버로부터 받아온다.
  // - plan.planId === -1 => 모든 계획일 것
  // - plan.planId === -2 => 해당 year에 해당하는 계획이 없는 것
  console.log(`${year}과 ${plan}에 해당하는 발자취 List로 변경 필요`);

  const { tempFootPrintList, fetchNextPage, isFetchingNextPage } =
    useMyFootPrintsQuery({
      sort: 'latest',
      current: true,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    // ref로 참조하고 있는 div 요소가 viewPort에 보여진다면 다음 페이지 fetch
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <ul className={classNames('footprint-list')}>
      {tempFootPrintList.map((item) => {
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

      <div className="footprint-list__loading-wrapper">
        {isFetchingNextPage ? (
          <FadeLoader color={COLOR.PRIMARY} speedMultiplier={1.3} />
        ) : (
          <div className="footprint-list__end" ref={ref} />
        )}
      </div>
    </ul>

    // TODO: ${year}와 ${plan.planTitle}에 해당하는 FootPrintList 출력
    // -> 지금은 임시로 "계획 전체조회 api(계획 둘러보기)"를 사용하고 있음
  );
}
