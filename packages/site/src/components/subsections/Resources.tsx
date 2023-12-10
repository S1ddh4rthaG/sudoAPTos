import { connect, getAddress, switchAccount, createAccount, getBalance, fundAccount, getAccountResources } from '../../methods/index';
import { useEffect, useState, useContext } from 'react';

import { WalletContext } from '../../context/WalletContext';

export const Resources = ({isActive}) => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);
  const [resources, setResources] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Fetch account info when the component becomes active
    if (isActive) {
      getAccountResources(SNAP_ID).then((result) => {
        console.log(result);
        setResources(result);
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
                <h5 className="card-title">Resources</h5>
                <p className="card-text">{JSON.stringify(resources)}</p>
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
                <h5 className="card-title">Resources</h5>
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