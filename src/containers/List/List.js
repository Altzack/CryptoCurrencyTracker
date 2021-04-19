import React, { useContext } from 'react';
import { Card, Divider } from 'antd';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';

const StyledCard = styled(Card)`
  width: 320px;
  margin-top: 10px;
  @media (min-width: 760px) {
    width: 450px;
  }
`;
export default function List() {
  const context = useContext(AppContext);

  const list = context.cryptoData.map((data) => {
    return (
      <StyledCard key={data.id} title={data.country}>
        <div>
          <span style={{ fontWeight: 300 }}>
            {data.name} - {data.symbol}
          </span>
          <>
            <Divider />
            <span style={{ fontWeight: 350 }}>Price: </span>
            <span style={{ fontWeight: 300 }}>
              ${Number(data.quote.USD.price).toLocaleString()}
            </span>
          </>
          <>
            <Divider />
            <span style={{ fontWeight: 350 }}>Market Cap: </span>
            <span style={{ fontWeight: 300 }}>
              ${Number(data.quote.USD.market_cap).toLocaleString()}
            </span>
          </>
          <>
            <Divider />
            <span style={{ fontWeight: 350 }}>Percent change: </span>
            <span style={{ fontWeight: 300 }}>
              {Number(data.quote.USD.percent_change_24h).toLocaleString()}%
            </span>
          </>
        </div>
      </StyledCard>
    );
  });

  return <div>{list}</div>;
}
