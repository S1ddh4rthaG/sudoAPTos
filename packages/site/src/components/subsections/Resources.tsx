import { connect, getAddress, switchAccount, createAccount, getBalance, fundAccount } from '../../methods/index';
import { useEffect, useState, useContext } from 'react';

import { WalletContext } from '../../context/WalletContext';

export const Resources = () => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);

  return (
    <h1>Resources</h1>
  )
}