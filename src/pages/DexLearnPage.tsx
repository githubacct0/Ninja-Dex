import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Tabs,Row, Col,AutoComplete } from 'antd';
import {
  useAllOpenOrdersBalances,
  useWalletBalancesForAllMarkets,
} from '../utils/markets';
import FloatingElement from '../components/layout/FloatingElement';
import WalletBalancesTable from '../components/UserInfoTable/WalletBalancesTable';
import { useMintToTickers } from '../utils/tokens';
import learn_wallet from '../assets/learn_wallet.svg';
import learn_send from '../assets/learn_send.svg';
import learn_cart from '../assets/learn_cart.svg';
import learn_plug from '../assets/learn_plug.svg';

const { TabPane } = Tabs;

const EXTERNAL_LINKS = {}

const options_complete = [
  // { value: 'How to create a SOL wallet', key: 'createwallet' },
  // { value: 'Create an account with FTX and buy SOL', key: 'createftx' },
  { value: 'Create an account with Binance and buy SOL', key: 'createbinance' },
  { value: 'How to create Binance account', key: 'createbinance' },
  { value: 'Connect SOL Wallet to Ninja DEX', key: 'dexconnect' },
  { value: 'Buy $NINJA: Trade on NINJA DEX', key: 'buyninja' },
];

export default function DexLearnPage() {

  const history = useHistory();
  const handleClick = useCallback(
    (e) => {
      if (!(e.key in EXTERNAL_LINKS)) {
        history.push(`./dexlearn/${e.key}`);
      }
    },
    [history],
  );

  return (
    <>
    <div style={{textAlign: 'center', paddingTop: '50px'}}>
      <div style={{fontSize: '18px'}}>Learn All about </div>
      <div style={{color: '#6F2DA8', fontSize: '44px', fontWeight: 'bold', lineHeight: '59px'}}>NINJA DEX</div>
      <div style={{fontSize: '18px', fontWeight: 300}}>Getting better and trade faster with NINJA DEX</div>
      <AutoComplete 
        className="learnsearch" 
        options={options_complete}
        placeholder="Search here !!"
        filterOption={(inputValue, option) =>
          option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={(inputValue, option) => {if (typeof option['key'] !== 'undefined' ){
          handleClick(option)
        }} }
       />
    </div>
    <div style={{padding: '90px 50px 50px 50px'}}>
      <Row 
            gutter={[16, 20]} 
      >
        <Col onClick={(e)=>handleClick(options_complete[0])} xl={8} lg={8} md={12} sm={24} xs={24}>
          <div className="learnbox">
            <div className="learnbox1">
              <img src={learn_wallet} />
            </div>
            <div className="learnbox2">
              <div style={{fontSize: '20px', fontWeight: 700 }}>How to create a SOL wallet</div>
              <div style={{ paddingTop: '20px' }}> How to create a SOL wallet</div>
            </div>
          </div>
        </Col>
        <Col onClick={(e)=>handleClick(options_complete[1])} xl={8} lg={8} md={12} sm={24} xs={24}>
          <div className="learnbox">
            <div className="learnbox1">
              <img src={learn_cart} />
            </div>
            <div className="learnbox2">
              <div style={{fontSize: '20px', fontWeight: 700 }}>Create an account with FTX and buy SOL</div>
              <div style={{ paddingTop: '20px' }}> How to create an account with FTX and buy SOL</div>
            </div>
          </div>
        </Col>
        <Col onClick={(e)=>handleClick(options_complete[2])} xl={8} lg={8} md={12} sm={24} xs={24}>
          <div className="learnbox">
            <div className="learnbox1">
              <img src={learn_cart} />
            </div>
            <div className="learnbox2">
              <div style={{fontSize: '20px', fontWeight: 700 }}>Create an account with Binance and buy SOL </div>
              <div style={{ paddingTop: '20px' }}> How to create an account with Binance and buy SOL</div>
            </div>
          </div>
        </Col>
        <Col onClick={(e)=>handleClick(options_complete[3])} xl={8} lg={8} md={12} sm={24} xs={24}>
          <div className="learnbox">
            <div className="learnbox1">
              <img src={learn_send} />
            </div>
            <div className="learnbox2">
              <div style={{fontSize: '20px', fontWeight: 700 }}>How to create Binance account </div>
              <div style={{ paddingTop: '20px' }}> How to create Binance account</div>
            </div>
          </div>
        </Col>
        <Col onClick={(e)=>handleClick(options_complete[4])} xl={8} lg={8} md={12} sm={24} xs={24}>
          <div className="learnbox">
            <div className="learnbox1">
              <img src={learn_plug} />
            </div>
            <div className="learnbox2">
              <div style={{fontSize: '20px', fontWeight: 700 }}>Connect SOL Wallet to Ninja DEX </div>
              <div style={{ paddingTop: '20px' }}> How to Connect SOL Wallet to Ninja DEX</div>
            </div>
          </div>
        </Col>
        <Col onClick={(e)=>handleClick(options_complete[5])} xl={8} lg={8} md={12} sm={24} xs={24}>
          <div className="learnbox">
            <div className="learnbox1">
              <img src={learn_cart} />
            </div>
            <div className="learnbox2">
              <div style={{fontSize: '20px', fontWeight: 700 }}>Buy $NINJA: Trade on NINJA DEX </div>
              <div style={{ paddingTop: '20px' }}> How to Buy $NINJA: Trade on NINJA DEX</div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    </>
  );
}
