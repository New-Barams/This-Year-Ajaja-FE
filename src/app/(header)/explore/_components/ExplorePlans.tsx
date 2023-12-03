'use client';

import { ToTopFloatingButton } from '@/components';
import { COLOR } from '@/constants';
import { useAllPlansQuery } from '@/hooks/apis/useAllPlansQuery';
import { useScroll } from '@/hooks/useScroll';
import { SortType } from '@/types/apis/plan/GetAllPlans';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { FadeLoader } from 'react-spinners';
import Plans from './Plans/Plans';
import Tab from './Tab/Tab';
import './index.scss';

type ExplorePlansProps = {
  isLogin: boolean;
};

export default function ExplorePlans({ isLogin }: ExplorePlansProps) {
  const { handleScroll, scrollableRef } = useScroll();
  const [sort, setSort] = useState<SortType>('latest');
  const [current, setCurrent] = useState(true);
  const { loadedPlans, fetchNextPage, hasNextPage } = useAllPlansQuery({
    sort,
    current,
  });
  const flatLoadedPlans = useMemo(() => loadedPlans.flat(), [loadedPlans]);
  // console.log('loadedPlans:', loadedPlans);
  // console.log('flatLoadedPlans:', flatLoadedPlans);
  const handleSort = (condition: SortType) => {
    setSort(condition);
  };
  const handleYear = (isNewYear: boolean) => {
    setCurrent(isNewYear);
  };
  return (
    <div
      ref={scrollableRef}
      className={classNames('explore-plans')}
      onScroll={handleScroll}>
      <div className={classNames('explore-plans__wrapper')}>
        <Tab handleSort={handleSort} handleYear={handleYear} />
        <InfiniteScroll
          pageStart={0}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={
            <FadeLoader
              key="loader"
              color={COLOR.PRIMARY}
              speedMultiplier={1}
              className={classNames('explore-plans__loader')}
            />
          }
          useWindow={false}
          getScrollParent={() => {
            return scrollableRef.current;
          }}>
          <Plans flatLoadedPlans={flatLoadedPlans} isLogin={isLogin} />
        </InfiniteScroll>
      </div>
      <ToTopFloatingButton />
    </div>
  );
}
