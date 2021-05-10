import React, { useContext } from 'react';
import {
  Card,
  Divider,
  Button,
  List,
  Typography,
  Table,
  Tag,
  Space,
} from 'antd';
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
  const { Column, ColumnGroup } = Table;

  const priceList = context.cryptoData.map((item) => {
    return {
      price: Number(item.quote.USD.price).toLocaleString(),
      symbol: item.name + ' • ' + item.symbol,
      marketc: Number(item.quote.USD.market_cap).toLocaleString(),
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
        <Table dataSource={priceList} title={() => 'Listed by CMC ranking'}>
          <Column
            dataIndex=""
            key="logo"
            render={(item) => (
              <img style={{ width: 24, heigh: 24 }} src={item.logo.logo} />
            )}
          />

          <Column title="Name" dataIndex="symbol" key="name" />
          <Column
            title="Price"
            dataIndex="price"
            key="price"
            render={(text) => '$' + text}
          />
          <Column title="24h %" dataIndex="percent" key="percent" />
          <Column
            title="Market Cap"
            dataIndex="marketc"
            key="marketC"
            render={(text) => '$' + text}
          />

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
          <Column
            title="Action"
            key="action"
            render={(item) => (
              <Space size="middle">
                <a href={`/coin/${item.symba}`}>more</a>
              </Space>
            )}
          />
        </Table>
      )}
    </>
  );
};
export default CryptoList;
