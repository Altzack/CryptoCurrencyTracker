import React from 'react';
import CryptoList from '../List/List';

export default function LandingPage() {
  // const [treeMap, setTreeMap] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* <h2 style={{ color: '#fff' }}>Listed by CMC ranking</h2> */}
      {/* {!treeMap ? (
        <Button style={{ color: '#000' }} onClick={() => setTreeMap(true)}>
          Column
        </Button>
      ) : (
        <Button style={{ color: '#000' }} onClick={() => setTreeMap(false)}>
          Cards
        </Button>
      )} */}

      {/* {!treeMap ? (
        <CryptoList />
      ) : (
        <div style={{ marginTop: 20 }}>
          <CryptoColumn />
        </div>
      )} */}
      <CryptoList />
    </div>
  );
}
