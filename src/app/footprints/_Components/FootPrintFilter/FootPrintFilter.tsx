import React from 'react';
import { planType } from '../MyFootPrints/MyFootPrints';

interface FootPrintFilterProps {
  year: number;
  setYear: (year: number) => void;
  setPlan: (plan: planType) => void;
}

export default function FootPrintFilter({
  year,
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

  // 자체 state
  // TODO: props으로 받은 year에 해당하는 모든 계획들을 return 하는 useQuery 정의하고 여기서로부터 data return
  // 이를 plan-dropdown의 options로 넣어주기
  // const [selectedYear, setSelectedYear] = useState(2024);
  // const [selectedPlan, setSelectedPlan] = useState<planType>({
  //   planId: -1,
  //   planTitle: '모든 계획',
  // });

  // TODO: useEffect로 year이 바뀔 때마다, selectedPlan의 값은 "모든 계획"으로 변경해주기
  // useEffect(() => {
  //   setSelectedPlan({
  //     planId: -1,
  //     planTitle: '모든 계획',
  //   });
  // }, [year]);

  return (
    <div
      onClick={() => {
        setYear(year);
        setPlan({ planId: -1, planTitle: '1' });
      }}>
      {year}
    </div>
  );
}
