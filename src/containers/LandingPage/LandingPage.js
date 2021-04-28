import React, { useState } from 'react';
import { Button } from 'antd';
import List from '../List/List';
import CryptoColumn from '../Treemap/Treemap';

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
        <Button style={{ color: '#000' }} onClick={() => setTreeMap(true)}>
          Column
        </Button>
      ) : (
        <Button style={{ color: '#000' }} onClick={() => setTreeMap(false)}>
          Cards
        </Button>
      )}

      {!treeMap ? (
        <List />
      ) : (
        <div style={{ marginTop: 20 }}>
          <CryptoColumn />
        </div>
      )}
    </div>
  );
}
