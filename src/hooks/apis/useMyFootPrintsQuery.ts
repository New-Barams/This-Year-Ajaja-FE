'use client';

import { getMyFootPrints } from '@/apis/client/getMyFootPrints';
import { QUERY_KEY } from '@/constants/queryKey';
import { GetAllPlansRequestQuery } from '@/types/apis/plan/GetAllPlans';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

// TODO: 수정 필요
export const useMyFootPrintsQuery = (query: GetAllPlansRequestQuery) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  } = useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEY.MY_FOOTPRINTS, query.sort, query.current], // sort와 current를 쿼리 키에 넣는 게 맞을까?
    queryFn: async ({ pageParam = {} }) => {
      let params = {
        sort: query.sort,
        current: query.current,
      };

      if (pageParam) {
        // start, ajaja가 들어있을 것임
        params = { ...params, ...pageParam };
      }

      const result = await getMyFootPrints(params);
      return result?.data;
    },
    initialPageParam: {}, // 초기 pageParam => 빈 객체
    getNextPageParam: (lastPage) => {
      // 더 불러올 data가 있는 지 확인하는 함수
      if (lastPage.length === 0) {
        // 빈 배열이라면
        return undefined;
      }

      const lastItem = lastPage[lastPage.length - 1]; // 가장 최근 받아온 3개 data 중 마지막 ite
      return query.sort === 'ajaja'
        ? { start: lastItem.id, ajaja: lastItem.ajajas } // 인기순이면 start, ajaja 모두 params에 넣어주기 위해
        : { start: lastItem.id }; // 인기순이면 start를 params에 넣어주기 위해
    },
    staleTime: 10000,
  });
  return {
    tempFootPrintList: data?.pages.flat() || [], // TODO: flat() 없애기
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    isError,
  };
};
