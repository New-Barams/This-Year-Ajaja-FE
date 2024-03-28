import { Dropdown } from '@/components';
import { useGetMyPlansForFootprintQuery } from '@/hooks/apis';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
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

  const { yearPlans } = useGetMyPlansForFootprintQuery(selectedYear);

  const planOptions = useMemo(() => {
    // 서버로부터 받아온 yearPlans가 변경되지 않는 이상 변하지 않는 변수
    return yearPlans.map((plan) => ({
      value: plan.planId,
      name: plan.planTitle,
    }));
  }, [yearPlans]);

  useEffect(() => {
    // selectedYear이 바뀔 때마다, selectedPlan의 값은 "모든 계획"으로 변경해주기
    setSelectedPlan({
      planId: -1,
      planTitle: '모든 계획',
    });
  }, [selectedYear]);

  const handleClickSearchBtn = () => {
    // 현재 dropdown에서 선택되어있는 year, plan 값으로 부모의 year, plan을 변경
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
