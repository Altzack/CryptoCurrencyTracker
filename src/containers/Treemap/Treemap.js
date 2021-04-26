import React, { useContext } from 'react';
import { Treemap } from '@ant-design/charts';
import AppContext from '../../AppContext';
import { useIsSmallScreen } from '../common/responsiveComponents';

const CryptoTreemap = () => {
  const context = React.useContext(AppContext);
  const isSmallScreen = useIsSmallScreen();
  const filteredData = context.cryptoData.filter(
    (e) =>
      e.name !== 'Bitcoin BEP2' &&
      e.name !== 'Wrapped Bitcoin' &&
      e.name !== 'yearn.finance'
  );

  const dataSet = filteredData.map((e) => ({
    name: e.name,
    value: Number(e.quote.USD.volume_24h),
  }));

  const data = {
    name: 'root',
    children: dataSet,
  };
  const config = {
    data,
    colorField: 'name',
    padding: 'auto',
    width: isSmallScreen ? 370 : 650,
  };
  return <Treemap {...config} />;
};

export default CryptoTreemap;
