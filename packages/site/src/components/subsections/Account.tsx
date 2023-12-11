import { connect, getAddress, switchAccount, createAccount, getBalance, fundAccount } from '../../methods/index';
import { useEffect, useState, useContext } from 'react';

import { WalletContext } from '../../context/WalletContext';
import { TitleBar } from '../TitleBar';

export const Account = () => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);

  return (
    <TitleBar title="Account"/>
  )
}