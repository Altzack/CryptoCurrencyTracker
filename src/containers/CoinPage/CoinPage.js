/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Typography, message, Tag } from 'antd';
import styled from 'styled-components/macro';
import { Line } from '@ant-design/charts';
import AppContext from '../../AppContext';
import { useIsSmallScreen } from '../common/responsiveComponents';

import config from '../../config';

import Loader from '../common/Loader/Loader';

const abbreviate = require('number-abbreviate');

const StyledDiv = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  margin-left: 50px;
`;

const TitleItem = styled.div`
  color: #fff;
  font-weight: 500;
  font-size: 22px;
`;

const ListTitleItem = styled.div`
  color: #a49d91;
  font-weight: 600;
  font-size: 14px;
  padding: 12px 1px 13px;
`;

const ListSubTitleItem = styled.div`
  color: #e8e6e3;
  font-weight: 500;
  font-size: 14px;
  padding: 12px 1px 13px;
`;

const CoinPage = () => {
  // const { Title, Paragraph, Text, Link } = Typography;
  const [metaPage, setMetaPage] = useState();
  const small = useIsSmallScreen();

  const context = useContext(AppContext);
  const id = useParams();
  const { getCryptoData } = context;
  const { getGraph } = context;
  // const { getMetaData } = context;
  const bigID = id.symbol;
  // const arg = context.cryptoData.map((item) => item.symbol);

  const getMetaPage = () => {
    fetch(
      `${context.config.META_ENDPOINT}symbol=${bigID}&CMC_PRO_API_KEY=${context.config.API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        const arr = Object.values(data.data);

        setMetaPage(arr[0]);
      })
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
  };

  useEffect(() => {
    let isMounted = true;
    getCryptoData();
    getGraph(bigID);
    fetch(
      `${context.config.META_ENDPOINT}symbol=${bigID}&CMC_PRO_API_KEY=${context.config.API_KEY}`,
      {
        method: 'GET',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        const arr = Object.values(data.data);

        if (isMounted) setMetaPage(arr[0]);
      })
      .catch((err) => {
        message.error(`Please try again later: ${err}`);
      });
    return () => {
      isMounted = false;
    };
  }, [getCryptoData, getGraph, bigID]);

  const coins = context.cryptoData;

  const coinInfo = coins.find((p) => {
    const boolThingy = p.symbol === id.symbol;
    return boolThingy;
  });

  // const coinMetaData = [context.metaData];

  // const getMetaPage = () => {
  //   const { symbol } = id.symbol;
  //   fetch(
  //     `${config.META_ENDPOINT}symbol=${symbol}&CMC_PRO_API_KEY=${config.API_KEY}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //     }
  //   )
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error(res.status);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => setMetaPage(data))
  //     .catch((err) => {
  //       message.error(`Please try again later: ${err}`);
  //     });
  // };

  // const coinMeta = coinMetaData.find((p) => {
  //   const boolThingy = p.symbol === id.symbol;
  //   console.log(context.metaData);
  //   return boolThingy;
  // });

  const data = context.graphData || [];
  console.log(metaPage);
  const config = {
    data,
    padding: 'auto',
    xField: 'date',
    autoFit: 'true',
    yField: 'price',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat('$', v);
        },
      },
    },
    xAxis: {
      tickCount: 8,
    },
  };

  return (
    <>
      {metaPage && coinInfo ? (
        <>
          <Typography>
            <Button type="link" className="link" href="/">
              go back
            </Button>
            <div>
              <StyledDiv>
                <TitleItem>{coinInfo.name} chart (30d)</TitleItem>
                {/* <TitleItem>
                  ${Number(coinInfo.quote.USD.price).toLocaleString()}
                </TitleItem> */}
              </StyledDiv>
            </div>
            <div style={{ padding: 20 }}>
              <Line {...config} />
            </div>
            {/* <div style={{ boxSizing: 'border-box', marginBottom: 16 }}>
              <img  alt="logo" src={coinInfo.}style={{ height: 32, width: 32, marginRight: 12 }} />
              <div>{coinInfo.name}</div>
              <div />
            </div> */}
            <div style={{ padding: 24 }}>
              <div
                style={{ padding: 24, borderRadius: 16, background: '#1B1d1e' }}
              >
                <TitleItem style={{ marginTop: 25 }}>
                  {coinInfo.name} Price Statistics
                </TitleItem>
                <ListSubTitleItem
                  style={{
                    marginTop: 25,
                    fontSize: 12,
                    fontWeight: 500,
                    color: '#a1998d',
                  }}
                >
                  {coinInfo.name} Price
                </ListSubTitleItem>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #867d6e',
                    borderTop: '1px solid #867d6e',
                  }}
                >
                  <ListTitleItem>{coinInfo.name} Price</ListTitleItem>
                  <ListSubTitleItem>
                    ${Number(coinInfo.quote.USD.price).toLocaleString()}
                  </ListSubTitleItem>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #867d6e',
                  }}
                >
                  <ListTitleItem>Trading Volume(24h)</ListTitleItem>
                  <ListSubTitleItem>
                    {small
                      ? abbreviate(
                          coinInfo.quote.USD.volume_24h,
                          2
                        ).toUpperCase()
                      : `$${Number(
                          coinInfo.quote.USD.volume_24h
                        ).toLocaleString()}`}
                  </ListSubTitleItem>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #867d6e',
                  }}
                >
                  <ListTitleItem>Market Cap</ListTitleItem>
                  <ListSubTitleItem>
                    {/* {
                      small ? abbreviate(Number(coinInfo.quote.USD.market_cap),2) : {Number(coinInfo.quote.USD.market_cap).toLocaleString()}

                    } */}
                    {small
                      ? abbreviate(
                          coinInfo.quote.USD.market_cap,
                          2
                        ).toUpperCase()
                      : `$${Number(
                          coinInfo.quote.USD.market_cap
                        ).toLocaleString()}`}
                  </ListSubTitleItem>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #867d6e',
                  }}
                >
                  <ListTitleItem>Market Rank</ListTitleItem>
                  <ListSubTitleItem>
                    #{Number(coinInfo.cmc_rank)}
                  </ListSubTitleItem>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #867d6e',
                  }}
                >
                  <ListTitleItem>Price Change(24h)</ListTitleItem>
                  <ListSubTitleItem>
                    {Number(coinInfo.quote.USD.percent_change_24h)
                      .toLocaleString()
                      .includes('-') ? (
                      <span style={{ color: '#eb4650' }}>
                        {`\u25BE${Number(coinInfo.quote.USD.percent_change_24h)
                          .toLocaleString()
                          .split('-')
                          .pop()
                          .trim()}%`}
                      </span>
                    ) : (
                      <span style={{ color: '#46ebac' }}>
                        {`\u25B4${Number(
                          coinInfo.quote.USD.percent_change_24h
                        ).toLocaleString()}%`}
                      </span>
                    )}
                  </ListSubTitleItem>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #867d6e',
                  }}
                >
                  <ListTitleItem>Price Change(7d)</ListTitleItem>
                  <ListSubTitleItem>
                    {Number(coinInfo.quote.USD.percent_change_7d)
                      .toLocaleString()
                      .includes('-') ? (
                      <span style={{ color: '#eb4650' }}>
                        {`\u25BE${Number(coinInfo.quote.USD.percent_change_7d)
                          .toLocaleString()
                          .split('-')
                          .pop()
                          .trim()}%`}
                      </span>
                    ) : (
                      <span style={{ color: '#46ebac' }}>
                        {`\u25B4${Number(
                          coinInfo.quote.USD.percent_change_7d
                        ).toLocaleString()}%`}
                      </span>
                    )}
                  </ListSubTitleItem>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #867d6e',
                  }}
                >
                  <ListTitleItem>Price Change(30d)</ListTitleItem>
                  <ListSubTitleItem>
                    {Number(coinInfo.quote.USD.percent_change_30d)
                      .toLocaleString()
                      .includes('-') ? (
                      <span style={{ color: '#eb4650' }}>
                        {`\u25BE${Number(coinInfo.quote.USD.percent_change_30d)
                          .toLocaleString()
                          .split('-')
                          .pop()
                          .trim()}%`}
                      </span>
                    ) : (
                      <span style={{ color: '#46ebac' }}>
                        {`\u25B4${Number(
                          coinInfo.quote.USD.percent_change_30d
                        ).toLocaleString()}%`}
                      </span>
                    )}
                  </ListSubTitleItem>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #867d6e',
                  }}
                >
                  <ListTitleItem>Price Change(60d)</ListTitleItem>
                  <ListSubTitleItem>
                    {Number(coinInfo.quote.USD.percent_change_60d)
                      .toLocaleString()
                      .includes('-') ? (
                      <span style={{ color: '#eb4650' }}>
                        {`\u25BE${Number(coinInfo.quote.USD.percent_change_60d)
                          .toLocaleString()
                          .split('-')
                          .pop()
                          .trim()}%`}
                      </span>
                    ) : (
                      <span style={{ color: '#46ebac' }}>
                        {`\u25B4${Number(
                          coinInfo.quote.USD.percent_change_60d
                        ).toLocaleString()}%`}
                      </span>
                    )}
                  </ListSubTitleItem>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #867d6e',
                  }}
                >
                  <ListTitleItem>Price Change(90d)</ListTitleItem>
                  <ListSubTitleItem>
                    {Number(coinInfo.quote.USD.percent_change_90d)
                      .toLocaleString()
                      .includes('-') ? (
                      <span style={{ color: '#eb4650' }}>
                        {`\u25BE${Number(coinInfo.quote.USD.percent_change_90d)
                          .toLocaleString()
                          .split('-')
                          .pop()
                          .trim()}%`}
                      </span>
                    ) : (
                      <span style={{ color: '#46ebac' }}>
                        {`\u25B4${Number(
                          coinInfo.quote.USD.percent_change_90d
                        ).toLocaleString()}%`}
                      </span>
                    )}
                  </ListSubTitleItem>
                </div>
                {/* <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #867d6e',
                  }}
                >
                  <ListTitleItem>Market Cap</ListTitleItem>
                  <ListSubTitleItem>
                    ${Number(coinInfo.quote.USD.market_cap).toLocaleString()}
                  </ListSubTitleItem>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #867d6e',
                  }}
                >
                  <ListTitleItem>Market Rank</ListTitleItem>
                  <ListSubTitleItem>
                    #{Number(coinInfo.cmc_rank)}
                  </ListSubTitleItem>
                </div> */}
                <div style={{ marginTop: 25 }}>
                  <ListSubTitleItem
                    style={{ fontSize: 12, fontWeight: 500, color: '#a1998d' }}
                  >
                    {coinInfo.name} Supply
                  </ListSubTitleItem>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #867d6e',
                      borderTop: '1px solid #867d6e',
                    }}
                  >
                    <ListTitleItem>Max Supply</ListTitleItem>
                    <ListSubTitleItem>
                      {coinInfo.max_supply !== null ? (
                        small ? (
                          abbreviate(coinInfo.max_supply, 2).toUpperCase()
                        ) : (
                          `${Number(coinInfo.max_supply).toLocaleString()} ${
                            coinInfo.symbol
                          }`
                        )
                      ) : (
                        <div>No Data</div>
                      )}
                    </ListSubTitleItem>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #867d6e',
                    }}
                  >
                    <ListTitleItem>Circulating Supply</ListTitleItem>
                    <ListSubTitleItem>
                      {coinInfo.circulating_supply !== null ? (
                        small ? (
                          abbreviate(
                            coinInfo.circulating_supply,
                            2
                          ).toUpperCase()
                        ) : (
                          `${Number(
                            coinInfo.circulating_supply
                          ).toLocaleString()} ${coinInfo.symbol}`
                        )
                      ) : (
                        <div>No Data</div>
                      )}
                    </ListSubTitleItem>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #867d6e',
                    }}
                  >
                    <ListTitleItem>Total Supply</ListTitleItem>
                    <ListSubTitleItem>
                      {coinInfo.total_supply !== null ? (
                        small ? (
                          abbreviate(coinInfo.total_supply, 2).toUpperCase()
                        ) : (
                          `${Number(coinInfo.total_supply).toLocaleString()} ${
                            coinInfo.symbol
                          }`
                        )
                      ) : (
                        <div>No Data</div>
                      )}
                    </ListSubTitleItem>
                  </div>
                </div>
                <div style={{ marginTop: 25 }}>
                  <ListSubTitleItem
                    style={{ fontSize: 12, fontWeight: 500, color: '#a1998d' }}
                  >
                    {coinInfo.name} Tags
                  </ListSubTitleItem>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #867d6e',
                      borderTop: '1px solid #867d6e',
                    }}
                  >
                    <ListSubTitleItem>
                      {metaPage['tag-names'].slice(0, 4).map((tag) => {
                        return (
                          <Tag style={{ marginTop: 5 }} color="#108ee9">
                            {tag}
                          </Tag>
                        );
                      })}
                    </ListSubTitleItem>
                  </div>
                </div>
              </div>
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
