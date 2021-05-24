import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import AppContext from '../../AppContext';

const Container = styled.div`
  padding: 9px 16px;
  position: relative;
  white-space: nowrap;
  overflow: auto hidden;
`;

const Span = styled.span`
  color: rgb(164, 157, 145);

  font-size: 11px;
  margin-right: 16px;
  white-space: nowrap;
`;

const SpanItem = styled.span`
  color: #e8e6e3;
`;

export default function GlobalMetrics() {
  const context = useContext(AppContext);
  return (
    <Container>
      <div>
        <Span>
          Cryptos:{' '}
          <SpanItem>
            {Number(
              context.globalMetric.total_cryptocurrencies
            ).toLocaleString()}
          </SpanItem>
        </Span>
        <Span>
          Exchanges:{' '}
          <SpanItem>
            {Number(context.globalMetric.active_exchanges).toLocaleString()}
          </SpanItem>
        </Span>
        <Span>
          Dominance:{' '}
          <SpanItem>
            BTC: {Number(context.globalMetric.btc_dominance).toFixed(1)}% &nbsp;
            ETH: {Number(context.globalMetric.eth_dominance).toFixed(1)}%
          </SpanItem>
        </Span>
        <Span>
          Defi Volume(24h):{' '}
          <SpanItem>
            $
            {Number(context.globalMetric.defi_volume_24h)
              .toLocaleString()
              .split('.')
              .shift()}
          </SpanItem>
        </Span>
      </div>
    </Container>
  );
}
