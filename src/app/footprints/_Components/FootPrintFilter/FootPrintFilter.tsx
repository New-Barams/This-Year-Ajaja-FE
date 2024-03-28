import { Dropdown } from '@/components';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { planType } from '../MyFootPrints/MyFootPrints';
import './index.scss';

interface FootPrintFilterProps {
  setYear: (year: number) => void;
  setPlan: (plan: planType) => void;
}

const yearOptions = [{ value: 2024, name: '2024년' }];

export default function FootPrintFilter({
  setYear,
  setPlan,
}: FootPrintFilterProps) {
  // TODO:
  // 1. props로 받은 year값을 기본값으로 year-DropDown의 selectedValue로 설정
  // 2. year에 해당하는 모든 계획 리스트 state를 보유한다.
  // 3. 모든 계획 리스트 state를 plan-DropDown의 options로 넣어준다.
  // 4. 검색 버튼을 클릭 시,
  // year-DropDown의 selectedValue 값으로 setYear() 호출
  // plan-DropDown의 selectedValue 값으로 setPlan() 호출

  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedPlan, setSelectedPlan] = useState<planType>({
    planId: -1,
    planTitle: '모든 계획',
  });

  const handleSelectedPlan = (newSelectedPlanId: number) => {
    const newSelectedPlan = planOptions.find(
      (plan) => plan.value === newSelectedPlanId,
    );
    setSelectedPlan({
      planId: newSelectedPlan!.value,
      planTitle: newSelectedPlan!.name,
    });
  };

  // TODO: props으로 받은 year에 해당하는 모든 계획들을 return 하는 useQuery 정의하고 여기서로부터 data return
  // 서버로부터 현재 year에 해당하는 계획들을 받아 planDropdown에 넣어줄 planOptions 만들기
  const planOptions = [
    { value: -1, name: '모든 계획' },
    { value: 52, name: '1일 1커밋하기' },
    { value: 53, name: '매일 운동하기' },
  ];

  useEffect(() => {
    // useEffect로 selectedYear이 바뀔 때마다, selectedPlan의 값은 "모든 계획"으로 변경해주기
    setSelectedPlan({
      planId: -1,
      planTitle: '모든 계획',
    });
  }, [selectedYear]);

  const handleClickSearchBtn = () => {
    setYear(selectedYear);
    setPlan(selectedPlan);
  };

  return (
    <div className={classNames('footprint-filter')}>
      <Dropdown
        dropdownId="year-filter"
        options={yearOptions}
        selectedValue={selectedYear}
        setSelectedValue={(newSelectedYear: number) => {
          setSelectedYear(newSelectedYear);
        }}
        classNameList={['footprint-filter__dropdown--year']}
      />

      <Dropdown
        dropdownId="plan-filter"
        options={planOptions}
        selectedValue={selectedPlan.planId}
        setSelectedValue={handleSelectedPlan}
        classNameList={['footprint-filter__dropdown--filter']}
      />

      <div
        className={classNames('footprint-filter__search-btn')}
        onClick={handleClickSearchBtn}>{`검색`}</div>
    </div>
  );
}
