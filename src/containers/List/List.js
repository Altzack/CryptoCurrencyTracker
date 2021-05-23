import React, { useContext } from 'react';
import { Table, Tag } from 'antd';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';
import Loader from '../common/Loader/Loader';
// import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import './List.css';
import { useIsSmallScreen } from '../common/responsiveComponents';

const abbreviate = require('number-abbreviate');

const StyledTableCon = styled.div`
  padding: 12px;
  width: 100%;
  ${({ mobile }) => mobile && 'width: 100%'};
`;
const StyledTag = styled(Tag)`
  border-radius: 4px;
  padding: 0px 6px;
  display: inline-block;
  margin-right: 0px;
  font-size: 12px;
  margin-left: 12px;
  border: none;
  background-image: initial;
  background-color: rgb(31, 34, 35);
  color: rgb(164, 157, 145);
`;

const CryptoList = () => {
  const context = useContext(AppContext);
  const { Column } = Table;
  const small = useIsSmallScreen();

  const priceList = context.cryptoData.map((item) => {
    return {
      rank: item.cmc_rank,
      percent7d: Number(item.quote.USD.percent_change_7d).toLocaleString(),
      price: Number(item.quote.USD.price).toLocaleString(),
      volume: Number(item.quote.USD.volume_24h),
      name: item.name,
      marketc: Number(item.quote.USD.market_cap),
      percent: Number(item.quote.USD.percent_change_24h).toLocaleString(),
      symba: item.symbol,
      logo: context.metaData.find((i) => i.symbol === item.symbol),
    };
  });

  return (
    <>
      {context.loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <StyledTableCon mobile={small} className="tableWrap">
          <Table
            pagination={{ position: ['bottomCenter'], defaultPageSize: 100 }}
            dataSource={priceList}
            title={() => 'Listed by CMC ranking'}
            scroll={small ? { x: 800 } : {}}
          >
            {/* <Column
              dataIndex=""
              key="logo"
              render={(item) => (
                <img style={{ width: 24, heigh: 24 }} src={item.logo.logo} />
              )}
            /> */}

            {!small ? (
              <Column
                title="#"
                dataIndex="rank"
                key="rank"
                render={(item) => <StyledTag>{item}</StyledTag>}
              />
            ) : (
              ''
            )}

            <Column
              title="Name"
              fixed={small ? 'left' : ''}
              sorter={(a, b) => {
                if (a.name < b.name) {
                  return -1;
                }
                if (a.name > b.name) {
                  return 1;
                }
                return 0;
              }}
              dataIndex=""
              key="name"
              render={(item) => (
                <>
                  {small ? (
                    <a href={`/coin/${item.symba}`}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          alt="logo"
                          style={{ width: 24, height: 24 }}
                          src={item.logo.logo}
                        />

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            flexDirection: 'column',
                          }}
                        >
                          <p
                            style={{
                              marginLeft: 12,
                              marginBottom: 0,
                              marginTop: 0,
                              marginRight: 0,

                              fontSize: 14,
                            }}
                          >
                            {item.name.charAt(0).toUpperCase() +
                              item.name.slice(1)}
                          </p>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <StyledTag>{item.rank}</StyledTag>
                            <p
                              style={{
                                marginLeft: 6,
                                marginBottom: 0,
                                marginTop: 0,
                                marginRight: 0,
                                color: '#a1998d',
                                fontSize: 12,
                              }}
                            >
                              {item.symba}
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  ) : (
                    <a href={`/coin/${item.symba}`}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          alt="logo"
                          style={{ width: 24, height: 24 }}
                          src={item.logo.logo}
                        />
                        <p
                          style={{
                            marginLeft: 12,
                            marginBottom: 0,
                            marginTop: 0,
                            marginRight: 0,

                            fontSize: 14,
                          }}
                        >
                          {item.name.charAt(0).toUpperCase() +
                            item.name.slice(1)}
                        </p>
                        <p
                          style={{
                            marginLeft: 6,
                            marginBottom: 0,
                            marginTop: 0,
                            marginRight: 0,
                            color: '#a1998d',
                            fontSize: 14,
                          }}
                        >
                          {item.symba}
                        </p>
                      </div>
                    </a>
                  )}
                </>
              )}
            />
            <Column
              title="Price"
              dataIndex="price"
              // width={small ? '128px' : ''}
              sorter={(a, b) => a.price - b.price}
              align={small ? 'right' : ''}
              key="price"
              render={(text) => `$${text}`}
            />
            <Column
              title="24h %"
              dataIndex="percent"
              // align={small ? 'left' : ''}
              align={small ? 'right' : ''}
              sorter={(a, b) => a.percent - b.percent}
              key="percent"
              render={(text) =>
                text.includes('-') ? (
                  <span style={{ color: '#eb4650' }}>
                    {`\u25BE${text.split('-').pop().trim()}%`}
                  </span>
                ) : (
                  <span style={{ color: '#46ebac' }}>{`\u25B4${text}%`}</span>
                )
              }
            />
            <Column
              title="7d %"
              align={small ? 'right' : ''}
              sorter={(a, b) => a.percent7d - b.percent7d}
              dataIndex="percent7d"
              // align={small ? 'left' : ''}
              key="percent7d"
              render={(text) =>
                text.includes('-') ? (
                  <span style={{ color: '#eb4650' }}>
                    {`\u25BE${text.split('-').pop().trim()}%`}
                  </span>
                ) : (
                  <span style={{ color: '#46ebac' }}>{`\u25B4${text}%`}</span>
                )
              }
            />
            <Column
              title="Market Cap"
              align={small ? 'right' : ''}
              dataIndex="marketc"
              // width="175px"
              key="marketC"
              width={small ? '130px' : ''}
              sorter={(a, b) => a.marketc - b.marketc}
              render={(text) =>
                small
                  ? `$${abbreviate(text, 2).toUpperCase()}`
                  : `$${Number(text).toLocaleString()}`
              }
            />
            <Column
              title="Volume(24h)"
              align={small ? 'right' : ''}
              dataIndex="volume"
              sorter={(a, b) => a.volume - b.volume}
              width={small ? '125px' : ''}
              key="vol"
              render={(text) =>
                small
                  ? `$${abbreviate(text, 2).toUpperCase()}`
                  : `$${Number(text).toLocaleString()}`
              }
            />
            {/* <Column
              title="Volume(24h)"
              dataIndex="volume"
              key="volume"
              render={(text) => '$' + text}
            /> */}
          </Table>
        </StyledTableCon>
      )}
    </>
  );
};
export default CryptoList;
