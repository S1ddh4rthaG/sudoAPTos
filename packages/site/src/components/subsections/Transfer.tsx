import { connect, getAddress, switchAccount, createAccount, getBalance, fundAccount,transfer } from '../../methods/index';
import { useEffect, useState, useContext } from 'react';

import { WalletContext } from '../../context/WalletContext';

export const Transfer = () => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);

  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState(0);

  return (
    <>
    <h1>Transfer</h1>
    
    {/* Take address,input from user */}

    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">Address</span>
      <input type="text" className="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" onChange={(e) => setAddress(e.target.value)} />
      <span className="input-group-text" id="basic-addon1">Amount</span>  
      <input type="text" className="form-control" placeholder="Amount" aria-label="Amount" aria-describedby="basic-addon1" onChange={(e) => setAmount(e.target.value)} />
    </div>

   

    <button className="btn btn-primary btn-lg mt-3" onClick={() => {
      transfer(SNAP_ID,address,amount).then((result) => {
        console.log(result);
        alert(result);
      });
    }
    }>Transfer</button>
    </>
  )
}