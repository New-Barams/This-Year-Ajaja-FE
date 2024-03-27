'use client';

import classNames from 'classnames';
import { useState } from 'react';
import AllFootPrints from './_Components/AllFootPrints/AllFootPrints';
import FootPrintTab from './_Components/FootPrintTab/FootPrintTab';
import MyFootPrints from './_Components/MyFootPrints/MyFootPrints';
import './index.scss';

export default function FootPrintsPage() {
  const [isMyFootPrintsTab, setIsMyFootPrintsTab] = useState(true);
  const setMyFootPrintsTab = () => {
    setIsMyFootPrintsTab(true);
  };

  const setAllFootPrintsTab = () => {
    setIsMyFootPrintsTab(false);
  };

  return (
    <div className={classNames('footprint-page')}>
      <FootPrintTab
        isMyFootPrintsTab={isMyFootPrintsTab}
        setMyFootPrintsTab={setMyFootPrintsTab}
        setAllFootPrintsTab={setAllFootPrintsTab}
      />
      {isMyFootPrintsTab ? <MyFootPrints /> : <AllFootPrints />}
    </div>
  );
}
