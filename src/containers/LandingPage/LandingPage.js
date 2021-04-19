import React from 'react';
import List from '../List/List';

export default function LandingPage() {
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
      <List />
    </div>
  );
}
