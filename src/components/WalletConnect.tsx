import React from 'react';
import { Dropdown, Menu, Button as AntdButton } from 'antd';
import styled from 'styled-components';
import { isMobileOnly } from "react-device-detect";

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
  
  & > img{
    margin-top: ${(props) => ((props.isConnectButton && props.isMobileOnly) ? '-4px' : '')};
  }
`;

const Container = styled.div`
  display: flex;
  background: #851cef;
  border-radius: 6px;
  min-height: 38px;
  align-items: baseline;
`;

const StyledDropdown = styled(Dropdown)`
  top: ${(props) => props.isMobileOnly === true ? '2px' : ''};
  & > img {
    margin-top: ${(props) => props.isMobileOnly === true ? '-4px' : ''};;
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
      <Button isConnectButton isMobileOnly={isMobileOnly} onClick={connected ? disconnect : connect}>
        <img src={wallet_svg} alt="" height="30px" />
        <span
          style={{ paddingLeft: '10px', paddingRight: '5', fontWeight: 'bold' }}
        >
          {connected ? 'Disconnect' : 'Connect'}
        </span>
      </Button>
      <StyledDropdown isMobileOnly={isMobileOnly} overlay={menu}>
        <Button>
          <img src={arrow_bottom} alt="" height="20px" width="15px" />
        </Button>
      </StyledDropdown>
    </Container>
  );
}
