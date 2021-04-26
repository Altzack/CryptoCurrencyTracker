import React, { useContext } from 'react';
import { Card, Divider, Button } from 'antd';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';
import CryptoTreemap from '../Treemap/Treemap';
import config from '../../config';

const StyledCard = styled(Card)`
  width: 320px;
  margin-top: 10px;
  @media (min-width: 760px) {
    width: 450px;
  }
`;
const List = () => {
  const context = useContext(AppContext);

  const list = context.cryptoData.map((data) => {
    return (
      <StyledCard>
        <div>
          <div
            style={{
              fontWeight: 500,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {data.name} - {data.symbol}
            <div
              style={{
                display: 'inline-flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button onClick={() => context.checkGraph(data.cmc_rank)}>
                Chart
              </Button>
            </div>
          </div>
          <div>
            {data.checked ? (
              <>
                <Divider />
                <div>hi</div>
              </>
            ) : (
              <>
                <Divider />
                <span style={{ fontWeight: 350 }}>Price: </span>
                <span style={{ fontWeight: 300 }}>
                  ${Number(data.quote.USD.price).toLocaleString()}
                </span>

                <Divider />
                <span style={{ fontWeight: 350 }}>Market Cap: </span>
                <span style={{ fontWeight: 300 }}>
                  ${Number(data.quote.USD.market_cap).toLocaleString()}
                </span>

                <Divider />
                <span style={{ fontWeight: 350 }}>Percent change: </span>
                <span style={{ fontWeight: 300 }}>
                  {Number(data.quote.USD.percent_change_24h).toLocaleString()}%
                </span>
              </>
            )}
          </div>
        </div>
      </StyledCard>
    );
  });

  return <div>{list}</div>;
};
export default List;
