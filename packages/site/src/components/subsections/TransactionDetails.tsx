import React from 'react';
import { FaCoins, FaLock, FaUser, FaClock, FaSignature, FaCode, FaKey } from 'react-icons/fa';

const TransactionDetails = ({ transaction }) => {
  const formatTimestamp = (timestamp) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(timestamp / 1000000).toLocaleDateString('en-US', options);
  };

  return (
    <div className="transaction-details">
      <div className="transaction-box">
        <FaCoins className="icon" />
        <h4 className="box-heading">Type</h4>
        <p className="box-value user-transaction">{transaction.type}</p>
      </div>

      <div className="transaction-box">
        <FaUser className="icon" />
        <h4 className="box-heading">Sender</h4>
        <p className="box-value">{transaction.sender}</p>
      </div>

      <div className="transaction-box">
        <FaUser className="icon" />
        <h4 className="box-heading">Receiver</h4>
        <p className="box-value">{ transaction.payload.arguments[0]}</p>
      </div>

      <div className="transaction-box">
        <FaCoins className="FaCoins" />
        <h4 className="box-heading">Amount</h4>
        <p className="box-value">{ transaction.payload.arguments[1]}</p>
      </div>

      <div className="transaction-box">
        <FaCode className="icon" />
        <h4 className="box-heading">Payload</h4>
        <p className="box-value">
          <strong>Type:</strong> {transaction.payload.type}
          <br />
          <strong>Function:</strong> {transaction.payload.function}
          <br />
        </p>
      </div>

      <div className="transaction-box">
        <FaLock className="icon" />
        <h4 className="box-heading">Hash</h4>
        <p className="box-value">{transaction.hash}</p>
      </div>

      
      <div className="transaction-box">
        <h4 className="box-heading">Sequence Number</h4>
        <p className="box-value">{transaction.sequence_number}</p>
      </div>

      <div className="transaction-box">
        <h4 className="box-heading">Max Gas Amount</h4>
        <p className="box-value">{transaction.max_gas_amount}</p>
      </div>

      <div className="transaction-box">
        <h4 className="box-heading">Gas Unit Price</h4>
        <p className="box-value">{transaction.gas_unit_price}</p>
      </div>

      <div className="transaction-box">
        <FaClock className="icon" />
        <h4 className="box-heading">Expiration Timestamp</h4>
        <p className="box-value">{formatTimestamp(transaction.expiration_timestamp_secs)}</p>
      </div>



      <div className="transaction-box">
        <FaSignature className="icon" />
        <h4 className="box-heading">Signature</h4>
        <p className="box-value">
          <strong>Type:</strong> {transaction.signature.type}
          <br />
          <strong>Public Key:</strong> {transaction.signature.public_key}
          <br />
          <strong>Signature:</strong> {transaction.signature.signature}
        </p>
      </div>
    </div>
  );
};

export default TransactionDetails;
