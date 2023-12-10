import { connect, getAddress, switchAccount, createAccount, getBalance, fundAccount,getAccountModules } from '../../methods/index';
import { useEffect, useState, useContext } from 'react';

import { WalletContext } from '../../context/WalletContext';

export const Module = ({isActive}) => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);
  
  const [modules,setModules] = useState([]);
  const [done, setDone] = useState(false);
  useEffect(() => {
    // Fetch account info when the component becomes active
    if (isActive) {
      getAccountModules(SNAP_ID).then((result) => {
        console.log(result);
        setModules(result);
        setDone(true);
      });
    }
  }, [isActive]); 


  return (
    <>
    <h1>Resources</h1>


    
    {done ? (
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
    ) : (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Modules</h5>
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