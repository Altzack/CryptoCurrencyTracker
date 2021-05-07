import React, { useContext } from 'react';
import { Card, Divider, Button, List } from 'antd';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';
import Loader from '../common/Loader/Loader';

const StyledCard = styled(Card)`
  width: 320px;
  margin-top: 10px;
  @media (min-width: 760px) {
    width: 450px;
  }
`;

const StyledLink = styled(Button)``;

const CryptoList = () => {
  const context = useContext(AppContext);

  const list = context.cryptoData.map((data) => {
    return (
      // <List
      //   dataSource={data}
      //   renderItem={(item) => (
      //     <List.Item
      //       actions={[
      //         <a key="list-loadmore-edit">edit</a>,
      //         <a key="list-loadmore-more">more</a>,
      //       ]}
      //     />
      //   )}
      // />

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
              <StyledLink type="link" href={`/coin/${data.symbol}`}>
                More Info
              </StyledLink>
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
export default CryptoList;
