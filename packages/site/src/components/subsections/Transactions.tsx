import React, { useEffect, useState, useContext } from 'react';
import { getAccountTransactions } from '../../methods/index';
import { WalletContext } from '../../context/WalletContext';
import { TitleBar } from '../TitleBar';

export const Transactions = ({ isActive }) => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);

  const [transactions, setTransactions] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Fetch account info when the component becomes active
    if (isActive && ACTIVE) {
      getAccountTransactions(SNAP_ID).then((result) => {
        console.log(result);
        setTransactions(result);
        setDone(true);
      });
    }
  }, [isActive]);

  // Format timestamp in "MM/DD/YYYY HH:mm:ss" format
  const formatTimestamp = (timestamp) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(timestamp / 1000000).toLocaleDateString('en-US', options);
  };

  // Display a brief part of the address and copy the complete address to clipboard when clicked
  const displayAndCopyAddress = (address) => {
    const lengthToShow = 8; // Display the first 8 characters
    const briefAddress = `${address.slice(0, lengthToShow)}...`;

    const copyToClipboard = () => {
      navigator.clipboard.writeText(address);
    };

    return (
      <div className="d-flex align-items-center p-1 rounded bg-primary text-light">
        <span className="sender-address" title="Click to copy" onClick={copyToClipboard}>
          {briefAddress}
        </span>
        <i className="bi bi-files clipboard-icon ms-2" title="Copy to Clipboard" onClick={copyToClipboard}></i>
      </div>
    );
  };

  return (
    <>
      <TitleBar title="Transactions" />

      {done ? (
        <div className="container p-0 m-0 mt-3">
          <div className="row p-0 m-0">
            <div className="col p-0 m-0">
              <div className="card p-0 bg-2 border-0">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead className="table-dark">
                        <tr className='text-center'>
                          <th>VERSION</th>
                          <th>TYPE</th>
                          <th>SUCCESS</th>
                          <th>TIMESTAMP</th>
                          <th>SENDER</th>
                          <th>SENT TO</th>
                          <th>FUNCTION</th>
                          <th>AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          // Check if it is an array and not an dictionary
                          Array.isArray(transactions) ?
                            (transactions.map((transaction, index) => (
                              <tr key={index} className='text-center'>
                                <td>{transaction.version}</td>
                                <td>{transaction.type}</td>
                                <td>{transaction.success ? (
                                  <i className="bi bi-check-circle-fill text-success"></i>
                                ) : (
                                  <i className="bi bi-x-circle-fill text-danger"></i>
                                )}</td>
                                <td>{formatTimestamp(transaction.timestamp)}</td>
                                <td>{displayAndCopyAddress(transaction.sender)}</td>
                                <td>{displayAndCopyAddress(transaction.payload.arguments[0])}</td>
                                <td>{transaction.payload.function}</td>
                                <td>{transaction.payload.arguments[1]}</td>
                              </tr>
                            ))) :
                            (
                              <tr className='text-center'>
                                <td colSpan={8}>
                                  <span className="badge bg-danger">No transactions found</span>
                                  <p>The Account address might not be used in any transaction yet.</p>
                                </td>
                              </tr>
                            )
                        }
                      </tbody>
                    </table>
                  </div>
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
                <div className="card-body text-center">
                  <h5 className="card-title">Resources</h5>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};