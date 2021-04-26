import React, { useContext } from 'react';
import { Treemap } from '@ant-design/charts';
import AppContext from '../../AppContext';

const CryptoTreemap = () => {
  const context = React.useContext(AppContext);
  const filteredData = context.cryptoData.filter(
    (e) =>
      e.name !== 'Bitcoin BEP2' &&
      e.name !== 'Wrapped Bitcoin' &&
      e.name !== 'yearn.finance'
  );

  const dataSet = filteredData.map((e) => ({
    name: e.name,
    value: e.quote.USD.percent_change_7d,
  }));

  const data = {
    name: 'root',
    children: dataSet,
  };
  const config = {
    data,
    colorField: 'name',
    padding: 'auto',
    width: 300,
  };
  return <Treemap {...config} />;
};

export default CryptoTreemap;
