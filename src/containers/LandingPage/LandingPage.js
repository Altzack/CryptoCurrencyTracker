import React, { useState } from 'react';
import List from '../List/List';
import CryptoTreemap from '../Treemap/Treemap';

export default function LandingPage() {
  const [treeMap, setTreeMap] = React.useState(false);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ color: '#fff' }}>Listed by CMC ranking</h2>
      {!treeMap ? (
        <button style={{ color: '#000' }} onClick={() => setTreeMap(true)}>
          Treemap
        </button>
      ) : (
        <button style={{ color: '#000' }} onClick={() => setTreeMap(false)}>
          Cards
        </button>
      )}

      {!treeMap ? (
        <List />
      ) : (
        <div style={{ marginTop: 20 }}>
          <CryptoTreemap />
        </div>
      )}
    </div>
  );
}
