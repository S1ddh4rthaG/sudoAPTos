import { connect, getAddress, switchAccount, createAccount, getBalance, fundAccount,getAccountTransactions } from '../../methods/index';
import { useEffect, useState, useContext } from 'react';

import { WalletContext } from '../../context/WalletContext';

export const Transactions = () => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);

  const [transactions, setTransactions] = useState([]);

  return (
    <>
    <h1>Transactions</h1>

    <button className="btn btn-primary btn-lg mt-3" onClick={() => {
      getAccountTransactions(SNAP_ID).then((result) => {
        console.log(result);
        setTransactions(result);
      });
    }
    }>getAccountTransactions</button>

    <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Transactions</h5>
                <p className="card-text">{JSON.stringify(transactions)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}