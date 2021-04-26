import React from 'react';

const AppContext = React.createContext({
  cryptoData: [],
  checkGraph: () => {},
  loading: true,
  graphData: [],
  getGraph: () => {},
  treeMap: false,
});

export default AppContext;
