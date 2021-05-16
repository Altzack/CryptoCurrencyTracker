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
      volume: Number(item.quote.USD.volume_24h).toLocaleString(),
      name: item.name,
      marketc: Number(item.quote.USD.market_cap),
      percent: Number(item.quote.USD.percent_change_24h).toLocaleString(),
      symba: item.symbol,
      logo: context.metaData.find((i) => i.symbol === item.symbol),
    };
  });
  console.log(priceList);

  // const list = context.cryptoData.map((data) => {
  //   return (
  //     // <List
  //     //   dataSource={data}
  //     //   renderItem={(item) => (
  //     //     <List.Item
  //     //       actions={[
  //     //         <a key="list-loadmore-edit">edit</a>,
  //     //         <a key="list-loadmore-more">more</a>,
  //     //       ]}
  //     //     />
  //     //   )}
  //     // />

  //     <StyledCard>
  //       <div>
  //         <div
  //           style={{
  //             fontWeight: 500,
  //             display: 'flex',
  //             justifyContent: 'space-between',
  //           }}
  //         >
  //           {data.name} - {data.symbol}
  //           <div
  //             style={{
  //               display: 'inline-flex',
  //               justifyContent: 'flex-end',
  //             }}
  //           >
  //             <StyledLink type="link" href={`/coin/${data.symbol}`}>
  //               More Info
  //             </StyledLink>
  //           </div>
  //         </div>
  //         <div>
  //           <>
  //             <Divider />
  //             <span style={{ fontWeight: 350 }}>Price: </span>
  //             <span style={{ fontWeight: 300 }}>
  //               ${Number(data.quote.USD.price).toLocaleString()}
  //             </span>

  //             <Divider />
  //             <span style={{ fontWeight: 350 }}>Market Cap: </span>
  //             <span style={{ fontWeight: 300 }}>
  //               ${Number(data.quote.USD.market_cap).toLocaleString()}
  //             </span>

  //             <Divider />
  //             <span style={{ fontWeight: 350 }}>Percent change: </span>
  //             <span style={{ fontWeight: 300 }}>
  //               {Number(data.quote.USD.percent_change_24h).toLocaleString()}%
  //             </span>
  //           </>
  //         </div>
  //       </div>
  //     </StyledCard>
  //   );
  // });

  return (
    <>
      {context.loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        // <List
        //   style={{ color: '#fff' }}
        //   dataSource={listNames}
        //   renderItem={(item) => (
        //     <List.Item
        //       actions={[
        //         <a
        //           href={`/coin/${item.split('•').pop().trim()}`}
        //           key="list-loadmore-more"
        //         >
        //           more
        //         </a>,
        //       ]}
        //     >
        //       <div style={{ color: '#fff' }}>{item}</div>
        //       <div>{item.split('•').shift().trim()}</div>
        //     </List.Item>
        //   )}
        // />
        <StyledTableCon mobile={small} className="tableWrap">
          <Table
            pagination={{ position: ['bottomCenter'], defaultPageSize: 100 }}
            dataSource={priceList}
            title={() => 'Listed by CMC ranking'}
            scroll={small ? { x: 700 } : {}}
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
                            {item.name}
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
                          {item.name}
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
              align={small ? 'right' : ''}
              key="price"
              render={(text) => `$${text}`}
            />
            <Column
              title="24h %"
              dataIndex="percent"
              // align={small ? 'left' : ''}
              align={small ? 'right' : ''}
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
              width="175px"
              key="marketC"
              render={(text) => `$${abbreviate(text, 2).toUpperCase()}`}
            />
            {/* <Column
              title="Volume(24h)"
              dataIndex="volume"
              key="volume"
              render={(text) => '$' + text}
            /> */}

            {/* <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags) => (
              <>
                {tags.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          /> */}
            {/* <Column
              title="Action"
              align={small ? 'right' : 'right'}
              key="action"
              render={(item) => (
                <Space size="middle">
                  <a href={`/coin/${item.symba}`}>more</a>
                </Space>
              )}
            /> */}
          </Table>
        </StyledTableCon>
      )}
    </>
  );
};
export default CryptoList;
