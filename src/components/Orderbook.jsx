import { Col, Row } from 'antd';
import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useMarket, useOrderbook, useMarkPrice } from '../utils/markets';
import { isEqual, getDecimalCount } from '../utils/utils';
import { useInterval } from '../utils/useInterval';
import FloatingElement from './layout/FloatingElement';
import usePrevious from '../utils/usePrevious';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const Title = styled.div`
  color: rgba(255, 255, 255, 1);
  text-align: center !important;
  font-size:20px;
`;

const SizeTitle = styled(Row)`
  padding: 0px 0 0px;
  color: #434a59;
`;

const MarkPriceTitle = styled(Row)`
  padding: 5px 0 5px;
  font-weight: 600;
  margin-top:0px;
  margin-bottom:3px;
  background: #282F3F;
  border-radius: 10px;
`;

const Line = styled.div`
  text-align: right;
  float: right;
  height: 100%;
  ${(props) =>
    props['data-width'] &&
    css`
      width: ${props['data-width']};
    `}
  ${(props) =>
    props['data-bgcolor'] &&
    css`
      background-color: ${props['data-bgcolor']};
    `}
`;


const LineTwo = styled.div`
  text-align: left;
  float: left;
  height: 100%;
  ${(props) =>
    props['data-width'] &&
    css`
      width: ${props['data-width']};
    `}
  ${(props) =>
    props['data-bgcolor'] &&
    css`
      background-color: ${props['data-bgcolor']};
    `}
`;

const Price = styled.div`
  position: absolute;
  right: 5px;
  color: #0EE9A7;
  font-weight: 700;
`;

const PriceTwo = styled.div`
  position: absolute;
  left: 5px;
  color: #FF4747;
  font-weight: 700;
`;

export default function Orderbook({ smallScreen, depth = 500, onPrice, onSize }) {
  const markPrice = useMarkPrice();
  const [orderbook] = useOrderbook();
  const { baseCurrency, quoteCurrency } = useMarket();

  const currentOrderbookData = useRef(null);
  const lastOrderbookData = useRef(null);

  const [orderbookData, setOrderbookData] = useState(null);

  useInterval(() => {
    if (
      !currentOrderbookData.current ||
      JSON.stringify(currentOrderbookData.current) !==
        JSON.stringify(lastOrderbookData.current)
    ) {
      let bids = orderbook?.bids || [];
      let asks = orderbook?.asks || [];

      let sum = (total, [, size], index) =>
        index < depth ? total + size : total;
      let totalSize = bids.reduce(sum, 0) + asks.reduce(sum, 0);

      let bidsToDisplay = getCumulativeOrderbookSide(bids, totalSize, false);
      let asksToDisplay = getCumulativeOrderbookSide(asks, totalSize, true);

      currentOrderbookData.current = {
        bids: orderbook?.bids,
        asks: orderbook?.asks,
      };

      setOrderbookData({ bids: bidsToDisplay, asks: asksToDisplay });
    }
  }, 250);

  useEffect(() => {
    lastOrderbookData.current = {
      bids: orderbook?.bids,
      asks: orderbook?.asks,
    };
  }, [orderbook]);

  function getCumulativeOrderbookSide(orders, totalSize, backwards = false) {
    let cumulative = orders
      .slice(0, depth)
      .reduce((cumulative, [price, size], i) => {
        const cumulativeSize = (cumulative[i - 1]?.cumulativeSize || 0) + size;
        cumulative.push({
          price,
          size,
          cumulativeSize,
          sizePercent: Math.round((cumulativeSize / (totalSize || 1)) * 100),
        });
        return cumulative;
      }, []);
    if (backwards) {
      cumulative = cumulative.reverse();
    }
    return cumulative;
  }

  return (
    <FloatingElement
      style={
        smallScreen ? { flex: 1 } : { overflowY: 'scroll',minHeight: '380px', overflow: 'hidden' }
      }
    >
     
      <SizeTitle>
        <Col span={24} style={{ textAlign: 'center' }}>
        <MarkPriceComponent markPrice={markPrice} />
        </Col>

        <Col span={7} style={{ textAlign: 'left', color: '#8C6ACB' }}>
          Size ({baseCurrency})
        </Col>
        <Col span={8} style={{ textAlign: 'center', color: '#8C6ACB' }}>
          Price ({quoteCurrency})
        </Col>
        <Col span={8} style={{ textAlign: 'right', color: '#8C6ACB' }}>
          Size ({baseCurrency})
        </Col>
        <Col className="ordebookdz" span={24} style={{
            paddingRight: '5px',
            overflowY: 'scroll',
            maxHeight: '290px',
            display: 'flex'
          }}>
          <Col span={12} style={{ textAlign: 'left' }}>
            {orderbookData?.bids.map(({ price, size, sizePercent }) => (
            <OrderbookRow
              key={price + ''}
              price={price}
              size={size}
              side={'buy'}
              sizePercent={sizePercent}
              onPriceClick={() => onPrice(price)}
              onSizeClick={() => onSize(size)}
            />
          ))}
          </Col>
          <Col span={12}>
            {orderbookData?.asks.map(({ price, size, sizePercent }) => (
            <OrderbookRowTwo
              key={price + ''}
              price={price}
              size={size}
              side={'sell'}
              sizePercent={sizePercent}
              onPriceClick={() => onPrice(price)}
              onSizeClick={() => onSize(size)}
            />
          )).reverse()}
          </Col>
        </Col>
      </SizeTitle>
      
    </FloatingElement>
  );
}

const OrderbookRow = React.memo(
  ({ side, price, size, sizePercent, onSizeClick, onPriceClick }) => {
    const element = useRef();

    const { market } = useMarket();

    useEffect(() => {
      // eslint-disable-next-line
      !element.current?.classList.contains('flash') &&
        element.current?.classList.add('flash');
      const id = setTimeout(
        () =>
          element.current?.classList.contains('flash') &&
          element.current?.classList.remove('flash'),
        250,
      );
      return () => clearTimeout(id);
    }, [price, size]);

    let formattedSize =
      market?.minOrderSize && !isNaN(size)
        ? Number(size).toFixed(getDecimalCount(market.minOrderSize) + 1)
        : size;

    let formattedPrice =
      market?.tickSize && !isNaN(price)
        ? Number(price).toFixed(getDecimalCount(market.tickSize) + 1)
        : price;

    return (
      <Row ref={element} style={{ marginBottom: 1 }} onClick={onSizeClick}>
        <Col span={12} style={{ textAlign: 'left', color: '#ffffff' }}>
          {formattedSize}
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Line
            data-width={sizePercent + '%'}
            data-bgcolor={
              side === 'buy'
                ? 'rgba(0, 212, 85, 0.2)'
                : 'rgba(255, 71, 71, 0.2)'
            }
          />
          <Price onClick={onPriceClick}>{formattedPrice}</Price>
        </Col>
      </Row>
    );
  },
  (prevProps, nextProps) =>
    isEqual(prevProps, nextProps, ['price', 'size', 'sizePercent']),
);

const OrderbookRowTwo = React.memo(
  ({ side, price, size, sizePercent, onSizeClick, onPriceClick }) => {
    const element = useRef();

    const { market } = useMarket();

    useEffect(() => {
      // eslint-disable-next-line
      !element.current?.classList.contains('flash') &&
        element.current?.classList.add('flash');
      const id = setTimeout(
        () =>
          element.current?.classList.contains('flash') &&
          element.current?.classList.remove('flash'),
        250,
      );
      return () => clearTimeout(id);
    }, [price, size]);

    let formattedSize =
      market?.minOrderSize && !isNaN(size)
        ? Number(size).toFixed(getDecimalCount(market.minOrderSize) + 1)
        : size;

    let formattedPrice =
      market?.tickSize && !isNaN(price)
        ? Number(price).toFixed(getDecimalCount(market.tickSize) + 1)
        : price;
    return (
      <Row ref={element} style={{ marginBottom: 1 }} onClick={onSizeClick}>
        
        <Col span={12} style={{ textAlign: 'left' }}>
          <LineTwo
            data-width={sizePercent + '%'}
            data-bgcolor={
              side === 'buy'
                ? 'rgba(0, 212, 85, 0.2)'
                : 'rgba(255, 71, 71, 0.2)'
            }
          />
          <PriceTwo onClick={onPriceClick}>{formattedPrice}</PriceTwo>
        </Col>
        <Col span={12} style={{ textAlign: 'right', color: '#ffffff' }}>
          {formattedSize}
        </Col>
      </Row>
    );
  },
  (prevProps, nextProps) =>
    isEqual(prevProps, nextProps, ['price', 'size', 'sizePercent']),
);

const MarkPriceComponent = React.memo(
  ({ markPrice }) => {
    const { market } = useMarket();
    const previousMarkPrice = usePrevious(markPrice);

    let markPriceColor =
      markPrice > previousMarkPrice
        ? '#0EE9A7'
        : markPrice < previousMarkPrice
        ? '#FF4747'
        : 'white';

    let formattedMarkPrice =
      markPrice &&
      market?.tickSize &&
      markPrice.toFixed(getDecimalCount(market.tickSize));

    return (
      <MarkPriceTitle justify="center">
      <Title>Orderbook</Title>   
        <Col style={{ color: markPriceColor }}>
          {markPrice > previousMarkPrice && (
            <ArrowUpOutlined style={{ marginRight: 10 , backgroundColor: '#0EE9A7', borderRadius: '50%', padding: '3px'}} className="arrow_white" />
          )}
          {markPrice < previousMarkPrice && (
            <ArrowDownOutlined style={{ marginRight: 10 , backgroundColor: '#FF4747', borderRadius: '50%', padding: '3px'}} className="arrow_white" />
          )}
          {formattedMarkPrice || '----'}
        </Col>
      </MarkPriceTitle>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps, ['markPrice']),
);