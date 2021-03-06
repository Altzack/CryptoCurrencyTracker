import React from 'react';

const AppContext = React.createContext({
  cryptoData: [],
  checkGraph: () => {},
  loading: true,
  graphData: [],
  getGraph: () => {},
  treeMap: false,
  globalMetric: [],
  getCryptoData: () => {},
  metaData: [],
  getMetaData: () => {},
  config: {},
  searchNames: [],
  error: false,
});

export default AppContext;
