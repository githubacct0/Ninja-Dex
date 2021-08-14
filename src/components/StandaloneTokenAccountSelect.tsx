import React from 'react';
import { TokenAccount } from '../utils/types';
import { useSelectedTokenAccounts } from '../utils/markets';
import { Button, Col, Select, Typography } from 'antd';
import { CopyOutlined,DeleteOutlined } from '@ant-design/icons';
import { abbreviateAddress } from '../utils/utils';
import { notify } from '../utils/notifications';
import { useWallet } from '../utils/wallet';

import {
  PublicKey,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from '@solana/web3.js';

export const TOKEN_PROGRAM_ID = new PublicKey(
  'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
);



export default function StandaloneTokenAccountsSelect({
  accounts,
  mint,
  label,
}: {
  accounts: TokenAccount[] | null | undefined;
  mint: string | undefined;
  label?: boolean;
}) {


  const wallets = useWallet();
  
  const { connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';
  
  const [
    selectedTokenAccounts,
    setSelectedTokenAccounts,
  ] = useSelectedTokenAccounts();

  let selectedValue: string | undefined;
  if (mint && mint in selectedTokenAccounts) {
    selectedValue = selectedTokenAccounts[mint];
  } else if (accounts && accounts?.length > 0) {
    selectedValue = accounts[0].pubkey.toBase58();
  } else {
    selectedValue = undefined;
  }

  const setTokenAccountForCoin = (value) => {
    if (!mint) {
      notify({
        message: 'Error selecting token account',
        description: 'Mint is undefined',
        type: 'error',
      });
      return;
    }
    const newSelectedTokenAccounts = { ...selectedTokenAccounts };
    newSelectedTokenAccounts[mint] = value;
    setSelectedTokenAccounts(newSelectedTokenAccounts);
  };

  return (
    <React.Fragment>
      {label && <Col span={8}>Token account:</Col>}
      <Col span={label ? 10 : 18}>
        <Select
          style={{ width: '100%' }}
          value={selectedValue}
          onSelect={setTokenAccountForCoin}
        >
          {accounts?.map((account) => (
            <Select.Option
              key={account.pubkey.toBase58()}
              value={account.pubkey.toBase58()}
            >
              <Typography.Text code>
                {label
                  ? abbreviateAddress(account.pubkey, 8)
                  : account.pubkey.toBase58()}
              </Typography.Text>
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={2} offset={1}>
        <Button
          shape="round"
          icon={<CopyOutlined />}
          size={'small'}
          onClick={() =>
            selectedValue && navigator.clipboard.writeText(selectedValue)
          }
        />
      </Col>

      {/*<Col span={2} offset={1}>
        <Button
          shape="round"
          icon={<DeleteOutlined />}
          size={'small'}
          onClick={() =>
            selectedValue && wallets.closeTokenAccount(publicKey)
          }
        />
      </Col>*/}
    </React.Fragment>
  );
}
