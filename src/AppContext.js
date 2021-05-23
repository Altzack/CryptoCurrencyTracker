import React from 'react';

const AppContext = React.createContext({
  cryptoData: [],
  checkGraph: () => {},
  loading: true,
  graphData: [],
  getGraph: () => {},
  treeMap: false,
  getCryptoData: () => {},
  metaData: [],
  getMetaData: () => {},
  config: {},
  error: false,
});

export default AppContext;
