import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Card, Divider, Button } from 'antd';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';
import CryptoTreemap from '../Treemap/Treemap';
import config from '../../config';
import Loader from '../common/Loader/Loader';

const StyledCard = styled(Card)`
  width: 320px;
  margin-top: 10px;
  @media (min-width: 760px) {
    width: 450px;
  }
`;

const CoinPage = () => {
  const context = useContext(AppContext);
  const [fuck, setFuck] = useState();
  const id = useParams();
  const { getCryptoData } = context;

  useEffect(() => {
    getCryptoData();
  }, [getCryptoData]);

  const coins = context.cryptoData;

  const coinInfo = coins.find((p) => {
    const boolThingy = p.id === Number(id.id);
    return boolThingy;
  });

  console.log(coinInfo);

  return (
    <div className="plant">
      {coinInfo ? (
        <>
          <Button type="link" className="link" href="/">
            go back
          </Button>
          <div>{coinInfo.id}</div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default CoinPage;
