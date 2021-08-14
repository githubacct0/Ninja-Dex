import React from 'react';
import { Dropdown, Menu,Button } from 'antd';
import { useWallet } from '../utils/wallet';
import LinkAddress from './LinkAddress';
import wallet_svg from '../assets/wallet.svg';
import arrow_bottom from '../assets/arrow_bottom.svg';

export default function WalletConnect() {
  const { connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';

  const menu = (
    <Menu>
      {connected && <LinkAddress shorten={true} address={publicKey} />}
      <Menu.Item key="3" onClick={select}>
        Change Wallet
      </Menu.Item>
    </Menu>
  );

  return (
    <div style={{display: 'flex', background: "#851CEF", borderRadius: '6px', minHeight: "38px", alignItems: "baseline"}}>
      
      <Button style={{background: 'transparent', border: '0px', padding: '5px'}} onClick={connected ? disconnect : connect}>
        <img src={wallet_svg} alt="" height="30px" />
        <span style={{ paddingLeft: '10px', paddingRight:'5', fontWeight: 'bold' }}>{connected ? 'Disconnect' : 'Connect'}</span>
      </Button>
      <Dropdown overlay={menu}>
        <Button style={{background: 'transparent', border: '0px', padding: '5px'}}>
          <img src={arrow_bottom} alt="" height="20px" width="15px" />
        </Button>
      </Dropdown>
    </div>
  );
}