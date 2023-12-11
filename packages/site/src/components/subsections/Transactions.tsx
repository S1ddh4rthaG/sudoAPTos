import React, { useEffect, useState, useContext } from 'react';
import { getAccountTransactions } from '../../methods/index';
import { WalletContext } from '../../context/WalletContext';
import TransactionDetails from './TransactionDetails'; // Import the new component

export const Transactions = ({ isActive }) => {
  const { SNAP_ID } = useContext(WalletContext);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
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
      <div className="d-flex align-items-center">
        <span className="sender-address" title="Click to copy" onClick={copyToClipboard}>
          {briefAddress}
        </span>
        <i className="bi bi-files clipboard-icon ms-2" title="Copy to Clipboard" onClick={copyToClipboard}></i>
      </div>
    );
  };

  // Handle the click on a transaction row
  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

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
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead className="table-dark">
                        <tr>
                          <th>VERSION</th>
                          <th>TYPE</th>
                          <th>TIMESTAMP</th>
                          <th>SENDER</th>
                          <th>SENT TO</th>
                          <th>FUNCTION</th>
                          <th>AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction, index) => (
                          <tr key={index} onClick={() => handleTransactionClick(transaction)} style={{ cursor: 'pointer' }}>
                            <td>{transaction.version}</td>
                            <td>{transaction.type}</td>
                            <td>{formatTimestamp(transaction.timestamp)}</td>
                            <td>{displayAndCopyAddress(transaction.sender)}</td>
                            <td>{displayAndCopyAddress(transaction.payload.arguments[0])}</td>
                            <td>{transaction.payload.function}</td>
                            <td>{transaction.payload.arguments[1]}</td>
                          </tr>
                        ))}
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
                <div className="card-body">
                  <h5 className="card-title">Transactions</h5>
                  <p className="card-text">Loading...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display the TransactionDetails component when a transaction is selected */}
      {selectedTransaction && <TransactionDetails transaction={selectedTransaction} />}
    </>
  );
};
