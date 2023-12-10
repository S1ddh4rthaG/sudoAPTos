import { connect, getAddress, switchAccount, createAccount, getBalance, fundAccount, getAccountResources } from '../../methods/index';
import { useEffect, useState, useContext } from 'react';

import { WalletContext } from '../../context/WalletContext';

export const Resources = () => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);
  const [resources, setResources] = useState([]);


  return (
    <>
    <h1>Resources</h1>

    <button className="btn btn-primary btn-lg mt-3" onClick={() => {
      getAccountResources(SNAP_ID).then((result) => {
        console.log(result);
        setResources(result);
      });
    }
    }>getAccountResources</button>

    

    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resources</h5>
              <p className="card-text">{JSON.stringify(resources)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  
  )
}