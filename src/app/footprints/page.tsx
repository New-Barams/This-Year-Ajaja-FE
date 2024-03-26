'use client';

import { useState } from 'react';
import AllFootPrints from './_Components/AllFootPrints/AllFootPrints';
import FootPrintTab from './_Components/FootPrintTab/FootPrintTab';
import MyFootPrints from './_Components/MyFootPrints/MyFootPrints';

export default function FootPrintsPage() {
  const [isMyFootPrintsTab, setIsMyFootPrintsTab] = useState(true);
  const setMyFootPrintsTab = () => {
    setIsMyFootPrintsTab(true);
  };

  const setAllFootPrintsTab = () => {
    setIsMyFootPrintsTab(false);
  };

  return (
    <>
      <FootPrintTab
        isMyFootPrintsTab={isMyFootPrintsTab}
        setMyFootPrintsTab={setMyFootPrintsTab}
        setAllFootPrintsTab={setAllFootPrintsTab}
      />
      {isMyFootPrintsTab ? <MyFootPrints /> : <AllFootPrints />}
    </>
  );
}
