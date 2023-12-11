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
    <>
      <TitleBar title="Account" />
      <div className="d-flex flex-column flex-fill p-1 ps-3 pe-3">
        <table className="table table-dark table-striped table-hover table-bordered">
          <thead>
            <tr>
              <th scope='col'>SNAP_ID</th>
              <th scope='col'>ACTIVE</th>
              <th scope='col'>ADDR</th>
              <th scope='col'>NETWORK</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{SNAP_ID}</td>
              <td>{ACTIVE.toString()}</td>
              <td>{ADDR}</td>
              <td>{NETWORK}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}