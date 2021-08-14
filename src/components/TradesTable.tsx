import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useMarket, useBonfidaTrades } from '../utils/markets';
import { getDecimalCount } from '../utils/utils';
import FloatingElement from './layout/FloatingElement';
import { BonfidaTrade } from '../utils/types';

const Title = styled.div`
  color: rgba(255, 255, 255, 1);
  text-align: center !important;
  font-size:20px;
  padding: 5px 0 5px;
  font-weight: 600;
  margin-top:0px;
  margin-bottom:0px;
  background: #282F3F;
  border-radius: 10px;
`;

const SizeTitle = styled(Row)`
  padding: 3px 0 3px;
  color: #434a59;
`;

export default function PublicTrades({ smallScreen }) {
  const { baseCurrency, quoteCurrency, market } = useMarket();
  const [trades, loaded] = useBonfidaTrades();

  return (
    <FloatingElement
      style={
        smallScreen
          ? { flex: 1 }
          : {
              
              minHeight: '270px',
              maxHeight: '458px',
            
            }
      }
    >
      <Title>Market trades</Title>
      <SizeTitle>
        <Col span={8} style={{ textAlign: 'left', color: '#8C6ACB' }}>Price ({quoteCurrency}) </Col>
        <Col span={8} style={{ textAlign: 'right', color: '#8C6ACB' }}>Size ({baseCurrency}) </Col>
        <Col span={8} style={{ textAlign: 'right', color: '#8C6ACB' }}>Time </Col>
      </SizeTitle>
      {!!trades && loaded && (
        <div
          className="scrolltrade"
          style={{
            marginRight: '-20x',
            paddingRight: '5px',
            overflowY: 'scroll',
            maxHeight: '258px',
          }}
        >
          {trades.map((trade: BonfidaTrade, i: number) => (
            <Row key={i} style={{ marginBottom: 4 }}>
              <Col
                span={8}
                style={{
                  color: trade.side === 'buy' ? '#0EE9A7' : '#FF4747',
                }}
              >
                {market?.tickSize && !isNaN(trade.price)
                  ? Number(trade.price).toFixed(
                      getDecimalCount(market.tickSize),
                    )
                  : trade.price}
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                {market?.minOrderSize && !isNaN(trade.size)
                  ? Number(trade.size).toFixed(
                      getDecimalCount(market.minOrderSize),
                    )
                  : trade.size}
              </Col>
              <Col span={8} style={{ textAlign: 'right', color: '#ffffff' }}>
                {trade.time && new Date(trade.time).toLocaleTimeString()}
              </Col>
            </Row>
          ))}
        </div>
      )}
    </FloatingElement>
  );
}