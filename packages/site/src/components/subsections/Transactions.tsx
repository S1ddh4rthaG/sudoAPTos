import { connect, getAddress, switchAccount, createAccount, getBalance, fundAccount,getAccountTransactions } from '../../methods/index';
import { useEffect, useState, useContext } from 'react';

import { WalletContext } from '../../context/WalletContext';

export const Transactions = ({isActive}) => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);

  const [transactions, setTransactions] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Fetch account info when the component becomes active
    if (isActive) {
      getAccountTransactions(SNAP_ID).then((result) => {
        console.log(result);
        setTransactions(result);
        setDone(true);
      });
    }
  }, [isActive]);



  return (
    <>
    <h1>Transactions</h1>


    {done ? (
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
    ) : (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Transactions</h5>
                <p className="card-text">Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    </>
  )
}