import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Typography } from 'antd';
import styled from 'styled-components/macro';
import { Line } from '@ant-design/charts';
import AppContext from '../../AppContext';
import CryptoTreemap from '../Treemap/Treemap';
import Loader from '../common/Loader/Loader';

const StyledDiv = styled.div`
  display: inline-flex;
  justify-content: space-around;
  width: 100%;
`;

const TitleItem = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 22px;
`;

const CoinPage = () => {
  const { Title, Paragraph, Text, Link } = Typography;

  const context = useContext(AppContext);
  const id = useParams();
  const { getCryptoData } = context;
  const { getGraph } = context;
  const bigID = id.symbol;

  useEffect(() => {
    getCryptoData();
    getGraph(bigID);
  }, [bigID, getCryptoData, getGraph]);

  const coins = context.cryptoData;

  const coinInfo = coins.find((p) => {
    const boolThingy = p.symbol === id.symbol;
    return boolThingy;
  });

  const data = context.graphData || [];
  console.log(context.graphData);

  const config = {
    data,
    padding: 'auto',
    xField: 'date',
    autoFit: 'true',
    yField: 'price',
    xAxis: {
      tickCount: 8,
    },
  };

  return (
    <>
      {coinInfo ? (
        <>
          <Typography>
            <Button type="link" className="link" href="/">
              go back
            </Button>
            <div>
              <StyledDiv>
                <TitleItem>{coinInfo.name}</TitleItem>
                <TitleItem>
                  ${Number(coinInfo.quote.USD.price).toLocaleString()}
                </TitleItem>
              </StyledDiv>
            </div>
            <div>
              <Line {...config} />
            </div>
          </Typography>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default CoinPage;
