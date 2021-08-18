import React from 'react';
import { Dropdown, Menu, Button as AntdButton } from 'antd';
import styled from 'styled-components';
import { useWallet } from '../utils/wallet';
import LinkAddress from './LinkAddress';
import wallet_svg from '../assets/wallet.svg';
import arrow_bottom from '../assets/arrow_bottom.svg';

const Button = styled(AntdButton)`
  background: transparent;
  border: 0px;
  padding: 5px;

  &:hover {
    color: ${(props) => (props.isConnectButton ? '#21073c' : '')};
  }
`;

const Container = styled.div`
  display: flex;
  background: #851cef;
  border-radius: 6px;
  align-items: baseline;

  @media screen and (max-width: 600px) {
    min-height: 43px;
  }
`;

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
    <Container>
      <Button isConnectButton onClick={connected ? disconnect : connect}>
        <img src={wallet_svg} alt="" height="30px" />
        <span
          style={{ paddingLeft: '10px', paddingRight: '5', fontWeight: 'bold' }}
        >
          {connected ? 'Disconnect' : 'Connect'}
        </span>
      </Button>
      <Dropdown overlay={menu}>
        <Button>
          <img src={arrow_bottom} alt="" height="20px" width="15px" />
        </Button>
      </Dropdown>
    </Container>
  );
}
