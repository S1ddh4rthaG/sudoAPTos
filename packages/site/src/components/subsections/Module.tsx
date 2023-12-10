import { connect, getAddress, switchAccount, createAccount, getBalance, fundAccount,getAccountModules } from '../../methods/index';
import { useEffect, useState, useContext } from 'react';

import { WalletContext } from '../../context/WalletContext';

export const Module = () => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);
  
  const [modules,setModules] = useState([]);

  return (
    <>
    <h1>Module</h1>

    <button className="btn btn-primary btn-lg mt-3" onClick={() => {
      getAccountModules(SNAP_ID).then((result) => {
        console.log(result);
        setModules(result);
      });
    }
    }>getAccountModules</button>


  <div className="container">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Modules</h5>
              <p className="card-text">{JSON.stringify(modules)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>


    </>


  )
}