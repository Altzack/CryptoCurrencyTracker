/* eslint-disable no-nested-ternary */
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../App.css';
import { Typography, Tag, Modal, Divider } from 'antd';
import styled from 'styled-components/macro';
import './CoinPage.css';
import { Line } from '@ant-design/charts';
import moment from 'moment';
import AppContext from '../../AppContext';
import {
  useIsSmallScreen,
  useIsMediumScreen,
} from '../common/responsiveComponents';

import Loader from '../common/Loader/Loader';

const abbreviate = require('number-abbreviate');

const TitleItem = styled.div`
  color: #fff;
  font-weight: 500;
  font-size: 22px;
`;

const NewsContainer = styled.article`
  align-items: center;
  justify-content: center;
  display: flex;
  margin: -1px -24px;
  border-bottom: 1px solid #34383a;
  padding: 5px;
  :hover {
    background-color: rgb(40, 47, 51);
  }
  @media (min-width: 320px) {
    width: 310px;
  }
  @media (min-width: 700px) {
    width: 600px;
  }
  @media (min-width: 900px) {
    width: auto;
  }
`;

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  margin-top: 15px;
  flex-wrap: wrap;
`;

const Title = styled.div`
  font-family: Rubik;
  font-weight: 300;
  text-align: left;
  font-size: 16px;
  width: 300px;
  text-transform: capitalize;
  color: #e8e6e3;
  margin-bottom: 10px;
  @media (min-width: 300px) {
    font-size: 11px;
    width: 300px;
    padding: 10px;
  }
  // @media (min-width: 600px) {
  //   font-size: 13px;
  //   width: 500px;
  // }
  @media (min-width: 900px) {
    font-size: 14px;
    width: 589px;
  }
`;

const SubTitle = styled.div`
  font-family: Rubik;
  color: #e8e6e3;
  font-weight: 400;
  text-align: left;
  max-width: 500px;
  margin-top: 5px;
  font-size: 10px;
  margin-bottom: 10px;
  @media (min-width: 300px) {
    font-size: 12px;
  }
  @media (min-width: 600px) {
    font-size: 14px;
  }
  @media (min-width: 900px) {
    font-size: 15px;
  }
`;

const NewsImg = styled.img`
  width: 100px;
  margin-left: 10px;
  @media (min-width: 300px) {
    width: 80px;
  }
`;

const Modified = styled.div`
  margin-top: 10px;
  color: #e8e6e3;

  @media (min-width: 300px) {
    font-size: 10px;
  }
  @media (min-width: 600px) {
    font-size: 12px;
  }
  @media (min-width: 900px) {
    font-size: 13px;
  }
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

const NamePill = styled.div`
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 500;
  line-height: 18px;
  margin-right: 8px;
  white-space: nowrap;
`;

const GraphTimePill = styled.div`
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 500;
  line-height: 18px;
  margin-right: 8px;
  white-space: nowrap;
  background: #515969;
  color: rgb(232, 230, 227);
  :hover {
    cursor: pointer;
  }
`;

const NamePillSpan = styled.span`
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 500;
  line-height: 18px;
  margin-right: 8px;
  white-space: nowrap;
`;

const ConverterDiv = styled.div`
  margin: 0px;
  box-sizing: border-box;
  position: relative;
  margin-bottom: 16px;
  border-color: rgb(52, 56, 58);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgb(52, 56, 58);
`;

const ConverterImg = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  margin-right: 12px;
`;

const HeaderCon = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

const ConverteInputDiv = styled.div`
  box-sizing: border-box;
  margin: 0px;
  display: flex;
  flex: 1 1 0%;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: end;
  justify-content: flex-end;
  color: rgb(34, 37, 49);
`;

const ConverteInput = styled.input`
  padding: 10px 0px;
  background: transparent;
  caret-color: rgb(56, 97, 251);
  border: none;
  outline: none;
  font-size: 18px;
  text-align: right;
  appearance: none;
  color: rgb(207, 214, 228);
  font-weight: 700;
  font-family: Inter, sans-serif;
  width: 100%;
`;

const ConverteSingleDiv = styled.div`
  box-sizing: border-box;
  margin: 0px;
  display: flex;
  flex: 1 1 0%;
  flex-direction: row;
  padding: 20px 24px;
  background-color: rgb(255, 255, 255);
  -webkit-box-align: center;
  align-items: center;
`;

const CoinPage = () => {
  // const { Title, Paragraph, Text, Link } = Typography;
  const [metaPage, setMetaPage] = useState();
  const [coinVal, setCoinVal] = useState();
  const [graphTime, setGraphTime] = useState(365);
  const [news, setNews] = useState([]);
  const [usdVal, setUSDVal] = useState();
  const [modal, setModal] = useState(false);
  const small = useIsSmallScreen();
  const lg = useIsMediumScreen();
  const context = useContext(AppContext);
  const id = useParams();
  const { getCryptoData } = context;
  const { getGraph } = context;
  // const { getMetaData } = context;
  const bigID = id.symbol.split('-').shift();
  const nameID = id.symbol.split('-').pop();

  // const arg = context.cryptoData.map((item) => item.symbol);

  useEffect(() => {
    let isMounted = true;
    getCryptoData();
    getGraph(bigID);
    fetch(`https://crypto-backend-22-e21566ade45e.herokuapp.com/api/coin-meta?symbol=${bigID}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Backend response:', data); // Log the full response for debugging
  
      if (!data || !data.data) {
        console.error('No data received or invalid response format');
        return;
      }
  
      const arr = Object.values(data.data);
  
      if (isMounted) setMetaPage(arr[0]);
    })
    .catch((err) => {
      console.error('Failed to fetch coin metadata:', err);
    });
  
  
  

    // fetch(
    //   `${context.config.NEWS_ENDPOINT}q=${nameID} AND ${bigID} OR ${bigID} OR ${nameID}&lang=en&sortby=publishedAt&country=us&token=${context.config.NEWS_TOKEN}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //     },
    //   }
    // )
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(res.status);
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     const arr = data.articles;
    //     if (isMounted) setNews(arr);
    //   })
    //   .catch((err) => {});
    return () => {
      isMounted = false;
    };
  }, [
    getCryptoData,
    getGraph,
    bigID,
    context.config.API_KEY,
    context.config.META_ENDPOINT,
    context.config.NEWS_ENDPOINT,
    context.config.NEWS_TOKEN,
    nameID,
  ]);

  const coins = context.cryptoData;

  const coinInfo = coins.find((p) => {
    const boolThingy = p.symbol === bigID;
    return boolThingy;
  });

  const coinInputOnChange = async () => {
    const val = document.getElementById('coinInput').value;
    const convertedValInfo = await coinInfo;
    const convertedValDollars = convertedValInfo.quote.USD.price;
    const convertedVal = val * convertedValDollars;
    const formatVal = Number(convertedVal).toFixed(2);
    setUSDVal(formatVal);
    setCoinVal(val);
  };

  const usdInputOnChange = async () => {
    const val = document.getElementById('usdInput').value;
    const convertedValInfo = await coinInfo;
    const convertedValDollars = convertedValInfo.quote.USD.price;
    const convertedVal = val / convertedValDollars;
    const formatVal = Number(convertedVal).toFixed(4);
    setCoinVal(formatVal);
    setUSDVal(val);
  };

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  const data = context.graphData.slice(-graphTime) || [];
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

  const setModalFunc = () => {
    setModal(true);
  };

  const setModalCloseFunc = () => {
    setModal(false);
  };

  return (
    <>
      {metaPage && coinInfo && context.graphData && news ? (
        <>
          <Typography>
            <div
              style={{
                display: 'flex',

                width: '100%',
              }}
            >
              <HeaderCon
                style={{
                  marginTop: 10,

                  maxWidth: 1400,
                }}
              >
                <div
                  style={{
                    marginBottom: 15,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      width: '100%',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ display: 'flex' }}>
                      <img
                        style={{ height: 32, width: 32 }}
                        src={metaPage.logo}
                        alt="logo"
                      />
                      <h2
                        style={{
                          margin: 0,
                          color: '#e8e6e3',
                          marginLeft: 10,
                          fontSize: 25,
                        }}
                      >
                        {coinInfo.name}
                      </h2>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        marginTop: 12,
                      }}
                    >
                      <h2
                        style={{
                          margin: 0,
                          color: '#e8e6e3',
                          fontSize: 20,
                        }}
                      >
                        ${Number(coinInfo.quote.USD.price).toLocaleString()}
                      </h2>
                      <div
                        style={{
                          display: 'flex',
                          width: '100%',
                          justifyContent: 'flex-end',
                        }}
                      >
                        {Number(coinInfo.quote.USD.percent_change_24h)
                          .toLocaleString()
                          .includes('-') ? (
                          <NamePillSpan
                            style={{
                              background: '#A5111A',
                              color: '#e8e6e3',
                              fontWeight: 500,
                              fontSize: 14,
                            }}
                          >
                            {`\u25BE${Number(
                              coinInfo.quote.USD.percent_change_24h
                            )
                              .toLocaleString()
                              .split('-')
                              .pop()
                              .trim()}%`}
                          </NamePillSpan>
                        ) : (
                          <NamePill
                            style={{
                              background: '#129f6a',
                              color: '#e8e6e3',
                              fontWeight: 500,
                              fontSize: 14,
                            }}
                          >
                            {`\u25B4${Number(
                              coinInfo.quote.USD.percent_change_24h
                            ).toLocaleString()}%`}
                          </NamePill>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  <NamePill
                    style={{
                      background: '#515969',
                      color: 'rgb(232, 230, 227)',
                    }}
                  >
                    {coinInfo.symbol}
                  </NamePill>
                  <NamePill
                    style={{
                      background: '#515969',
                      color: 'rgb(232, 230, 227)',
                    }}
                  >
                    Rank #{coinInfo.cmc_rank}
                  </NamePill>
                  <NamePill
                    style={{
                      background: '#515969',
                      color: 'rgb(232, 230, 227)',
                    }}
                  >
                    {metaPage.category.charAt(0).toUpperCase() +
                      metaPage.category.slice(1)}
                  </NamePill>
                  <NamePill
                    onClick={setModalFunc}
                    className="linkButton"
                    style={{
                      background: '#108ee9',
                      color: 'rgb(232, 230, 227)',
                    }}
                  >
                    Links
                  </NamePill>
                  <Modal
                    footer={null}
                    visible={modal}
                    onCancel={setModalCloseFunc}
                  >
                    <h2 style={{ margin: 0 }}>Links</h2>
                    <Divider style={{ margin: 0, marginBottom: 10 }} />
                    <ul>
                      {metaPage.urls.website ? (
                        <li>
                          <a href={metaPage.urls.website}>Website</a>
                        </li>
                      ) : (
                        ''
                      )}
                      {metaPage.urls.source_code ? (
                        <li>
                          <a href={metaPage.urls.source_code}>Source Code</a>
                        </li>
                      ) : (
                        ''
                      )}
                      {metaPage.urls.technical_doc ? (
                        <li>
                          <a href={metaPage.urls.technical_doc}>
                            Technical Doc
                          </a>
                        </li>
                      ) : (
                        ''
                      )}
                    </ul>
                    <h2 style={{ margin: 0 }}>Explorer</h2>
                    <Divider style={{ margin: 0, marginBottom: 10 }} />
                    <ul>
                      {metaPage.urls.explorer.map((item) => {
                        return (
                          <li>
                            <a href={item}>{item}</a>
                          </li>
                        );
                      })}
                    </ul>
                    <h2 style={{ margin: 0 }}>Community</h2>
                    <Divider style={{ margin: 0, marginBottom: 10 }} />
                    <ul>
                      {metaPage.urls.twitter ? (
                        <li>
                          <a href={metaPage.urls.twitter}>Twitter</a>
                        </li>
                      ) : (
                        ''
                      )}
                      {metaPage.urls.reddit ? (
                        <li>
                          <a href={metaPage.urls.reddit}>Reddit</a>
                        </li>
                      ) : (
                        ''
                      )}
                      {metaPage.urls.message_board ? (
                        <li>
                          <a href={metaPage.urls.message_board}>
                            Message Board
                          </a>
                        </li>
                      ) : (
                        ''
                      )}
                    </ul>
                  </Modal>
                </div>
                <Divider style={{ borderColor: '#34383a', marginBottom: 10 }} />
              </HeaderCon>
            </div>
            <div
              style={{
                display: lg ? 'flex' : '',
                justifyContent: lg ? 'center' : '',
              }}
            >
              <div
                style={{
                  display: lg ? 'inline-flex' : '',
                  maxWidth: 1400,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      paddingLeft: 15,
                      paddingRight: 15,
                      paddingTop: 5,
                      maxWidth: 1000,
                      width: lg ? 900 : '100%',
                    }}
                  >
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      {context.error ? (
                        <TitleItem>No Chart Data</TitleItem>
                      ) : (
                        <>
                          <TitleItem style={{ fontSize: small ? 17 : '' }}>
                            {coinInfo.name} chart
                          </TitleItem>
                        </>
                      )}
                      <div
                        style={{
                          display: 'inline-flex',
                          marginLeft: 20,
                        }}
                      >
                        <GraphTimePill
                          style={{
                            background: graphTime === 7 ? 'rgb(50,50,250)' : '',
                          }}
                          onClick={() => setGraphTime(7)}
                        >
                          1W
                        </GraphTimePill>
                        <GraphTimePill
                          style={{
                            background:
                              graphTime === 30 ? 'rgb(50,50,250)' : '',
                          }}
                          onClick={() => setGraphTime(30)}
                        >
                          1M
                        </GraphTimePill>
                        <GraphTimePill
                          style={{
                            background:
                              graphTime === 90 ? 'rgb(50,50,250)' : '',
                          }}
                          onClick={() => setGraphTime(90)}
                        >
                          3M
                        </GraphTimePill>
                        <GraphTimePill
                          style={{
                            background:
                              graphTime === 365 ? 'rgb(50,50,250)' : '',
                          }}
                          onClick={() => setGraphTime(365)}
                        >
                          1Y
                        </GraphTimePill>
                        {/* <GraphTimePill
                          style={{
                            background:
                              graphTime === context.graphData.length
                                ? 'rgb(50,50,250)'
                                : '',
                          }}
                          onClick={() => setGraphTime(context.graphData.length)}
                        >
                          ALL
                        </GraphTimePill> */}
                      </div>
                    </div>
                    <Divider
                      style={{ borderColor: '#34383a', marginTop: 15 }}
                    />
                    {!context.error ? <Line {...config} /> : ''}
                    <div
                      style={{
                        padding: 24,
                        color: '#e8e6e3',
                        borderRadius: 16,
                        background: '#1B1d1e',
                        // width: 620,
                        height: 'fit-content',
                        marginTop: 20,
                      }}
                    >
                      <TitleItem style={{ marginBottom: 5 }}>
                        What is {coinInfo.name} ({coinInfo.symbol})?
                      </TitleItem>
                      {metaPage.description}
                    </div>
                    {lg && (
                      <div
                        style={{
                          padding: 24,
                          borderRadius: 16,
                          background: '#1B1d1e',
                          // width: 620,
                          height: 'fit-content',
                          marginTop: 20,
                        }}
                      >
                        <div>
                          <TitleItem style={{}}>
                            {coinInfo.symbol} News
                          </TitleItem>
                          <Divider
                            style={{
                              borderColor: '#34383a',
                              marginTop: 12,
                            }}
                          />

                          {news.slice(0, 3).map((newsObj) => {
                            return (
                              <a
                                href={newsObj.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={newsObj.url}
                              >
                                <NewsContainer>
                                  <Title>
                                    <SubTitle>{newsObj.source.name}</SubTitle>
                                    {newsObj.title}
                                    <Modified>
                                      {moment(newsObj.publishedAt).format(
                                        'MMM Do YY'
                                      )}
                                    </Modified>
                                  </Title>
                                  {newsObj.image ? (
                                    <div>
                                      <NewsImg
                                        alt={newsObj.title}
                                        src={newsObj.image}
                                      />
                                    </div>
                                  ) : (
                                    <div>no image</div>
                                  )}
                                </NewsContainer>
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  style={
                    {
                      // display: lg ? 'flex' : '',
                      // justifyContent: lg ? 'space-evenly' : '',
                    }
                  }
                >
                  <div
                    style={{
                      padding: 24,
                      // width: lg ? '100%' : '',
                      // display: lg ? 'flex' : '',
                      // justifyContent: lg ? 'space-evenly' : '',
                    }}
                  >
                    <ConverterDiv style={{ width: lg ? 500 : '' }}>
                      <ConverteSingleDiv
                        style={{ background: 'rgb(24, 26, 27)' }}
                      >
                        <ConverterImg alt="logo" src={metaPage.logo} />
                        <div style={{ margin: 0, boxSizing: 'border-box' }}>
                          <p style={{ margin: 0, color: 'rgb(164, 157, 145)' }}>
                            {coinInfo.symbol}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              color: 'rgb(206, 202, 195)',
                              fontSize: 14,
                            }}
                          >
                            {coinInfo.name}
                          </p>
                        </div>
                        <ConverteInputDiv>
                          <ConverteInput
                            id="coinInput"
                            type="number"
                            pattern="/^-?d+.?d*$/"
                            value={coinVal}
                            maxLength="10"
                            onInput={maxLengthCheck}
                            placeholder="0"
                            onChange={coinInputOnChange}
                          />
                        </ConverteInputDiv>
                      </ConverteSingleDiv>
                      <ConverteSingleDiv
                        style={{ background: 'rgb(27, 29, 30)' }}
                      >
                        <ConverterImg
                          alt="logo"
                          src="https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/USD.svg"
                        />
                        <div style={{ margin: 0, boxSizing: 'border-box' }}>
                          <p style={{ margin: 0, color: 'rgb(164, 157, 145)' }}>
                            USD
                          </p>
                          <p
                            style={{
                              margin: 0,
                              color: 'rgb(206, 202, 195)',
                              fontSize: 14,
                            }}
                          >
                            United States Dollar
                          </p>
                        </div>
                        <ConverteInputDiv>
                          <ConverteInput
                            id="usdInput"
                            pattern="/^-?d+.?d*$/"
                            value={usdVal}
                            type="number"
                            maxLength="10"
                            onInput={maxLengthCheck}
                            placeholder="0"
                            onChange={usdInputOnChange}
                          />
                        </ConverteInputDiv>
                      </ConverteSingleDiv>
                    </ConverterDiv>

                    <div
                      style={{
                        padding: 24,
                        borderRadius: 16,
                        background: '#1B1d1e',
                        width: lg ? 500 : '',
                      }}
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
                              {`\u25BE${Number(
                                coinInfo.quote.USD.percent_change_24h
                              )
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
                              {`\u25BE${Number(
                                coinInfo.quote.USD.percent_change_7d
                              )
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
                              {`\u25BE${Number(
                                coinInfo.quote.USD.percent_change_30d
                              )
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
                              {`\u25BE${Number(
                                coinInfo.quote.USD.percent_change_60d
                              )
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
                              {`\u25BE${Number(
                                coinInfo.quote.USD.percent_change_90d
                              )
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
                      <div style={{ marginTop: 25 }}>
                        <ListSubTitleItem
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: '#a1998d',
                          }}
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
                                `${Number(
                                  coinInfo.max_supply
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
                                abbreviate(
                                  coinInfo.total_supply,
                                  2
                                ).toUpperCase()
                              ) : (
                                `${Number(
                                  coinInfo.total_supply
                                ).toLocaleString()} ${coinInfo.symbol}`
                              )
                            ) : (
                              <div>No Data</div>
                            )}
                          </ListSubTitleItem>
                        </div>
                      </div>
                      <div style={{ marginTop: 25 }}>
                        <ListSubTitleItem
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: '#a1998d',
                          }}
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
                                <Tag style={{ marginTop: 5 }} color="#515969">
                                  {tag}
                                </Tag>
                              );
                            })}
                          </ListSubTitleItem>
                        </div>
                      </div>
                    </div>

                    {!lg && (
                      <div
                        style={{
                          borderRadius: 16,
                          marginTop: 12,
                          background: '#1B1d1e',
                          // width: 620,
                          padding: 24,
                          height: 'fit-content',
                        }}
                      >
                        <TitleItem>{coinInfo.symbol} News</TitleItem>
                        <Divider
                          style={{ borderColor: '#34383a', marginTop: 10 }}
                        />

                        {news.slice(0, 3).map((newsObj) => {
                          return (
                            <PageContainer>
                              <a
                                href={newsObj.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={newsObj.url}
                              >
                                <NewsContainer style={{}}>
                                  <Title>
                                    <SubTitle>{newsObj.source.name}</SubTitle>
                                    {newsObj.title}
                                    <Modified>
                                      {moment(newsObj.publishedAt).format(
                                        'MMM Do YY'
                                      )}
                                    </Modified>
                                  </Title>
                                  {newsObj.image ? (
                                    <div>
                                      <NewsImg
                                        alt={newsObj.title}
                                        src={newsObj.image}
                                      />
                                    </div>
                                  ) : (
                                    <div>no image</div>
                                  )}
                                </NewsContainer>
                              </a>
                            </PageContainer>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
                {/* 
                {!lg && (
                  <div
                    style={{
                      borderRadius: 16,
                      background: '#1B1d1e',
                      // width: 620,
                      height: 'fit-content',
                    }}
                  >
                    <TitleItem>{coinInfo.symbol} News</TitleItem>
                    <Divider
                      style={{ borderColor: '#34383a', marginTop: 10 }}
                    />

                    {news.slice(0, 3).map((newsObj) => {
                      return (
                        <PageContainer>
                          <a
                            href={newsObj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={newsObj.url}
                          >
                            <NewsContainer style={{}}>
                              <Title>
                                <SubTitle>{newsObj.source.name}</SubTitle>
                                {newsObj.title}
                                <Modified>
                                  {moment(newsObj.publishedAt).format(
                                    'MMM Do YY'
                                  )}
                                </Modified>
                              </Title>
                              {newsObj.image ? (
                                <div>
                                  <NewsImg
                                    alt={newsObj.title}
                                    src={newsObj.image}
                                  />
                                </div>
                              ) : (
                                <div>no image</div>
                              )}
                            </NewsContainer>
                          </a>
                        </PageContainer>
                      );
                    })}
                  </div>
                )} */}
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
