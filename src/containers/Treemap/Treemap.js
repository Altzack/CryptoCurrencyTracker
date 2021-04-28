import React, { useContext } from 'react';
import { Column } from '@ant-design/charts';
import AppContext from '../../AppContext';
import { useIsSmallScreen } from '../common/responsiveComponents';

const CryptoColumn = () => {
  const context = React.useContext(AppContext);
  const isSmallScreen = useIsSmallScreen();
  const filteredData = context.cryptoData.filter(
    (e) =>
      e.name !== 'Bitcoin BEP2' &&
      e.name !== 'Wrapped Bitcoin' &&
      e.name !== 'Bitcoin' &&
      e.name !== 'yearn.finance'
  );

  const dataSet = filteredData
    .map((e) => ({
      name: e.symbol,
      value: Number(e.quote.USD.price),
    }))
    .slice(0, 10);

  const config = {
    data: dataSet,
    xField: 'name',
    yField: 'value',
  };
  return <Column {...config} />;
};

export default CryptoColumn;
