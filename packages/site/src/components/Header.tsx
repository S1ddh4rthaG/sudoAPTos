import React, { useEffect, useState } from 'react';
import { connect, getAddress, createAccount, switchAccount } from '../methods/index';

import { WalletContext } from '../context/WalletContext';
import { printAddress } from '../utils/functionals';

export const Header = () => {
  const [reconnect, setReconnect] = useState(false);
  const [network, setNetwork] = useState('devnet');
  const [accountName, setAccountName] = useState('Account');
  const [snapId, setSnapId] = useState('');

  const { setSNAP_ID } = React.useContext(WalletContext);
  const { setACTIVE } = React.useContext(WalletContext);
  const { setADDR } = React.useContext(WalletContext);
  const { setNETWORK } = React.useContext(WalletContext);

  useEffect(() => {
    const snapID = `local:http://localhost:8080`
    setSnapId(snapID);
    setSNAP_ID(snapID);

  }, []);

  const handleNetworkChange = (network: string) => {
    setNetwork(network);
  };

  return (
    <header>
      <nav className="d-flex flex-row navbar navbar-expand-sm p-1 pb-2 shadow-sm">
        <a className="navbar-brand header-title" href="#">sudoAptos</a>

        <div className='flex-fill'>

        </div>

        <div className="ml-auto" id="navbarNavDropdown">
          <ul className="navbar-nav ml-auto">
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle header-network" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i className={"ms-2 me-2 p-1 bi bi-box-fill"}></i>
                <span className='fw-bold'>{network.toUpperCase()}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><button className="dropdown-item header-network-mainnet" onClick={() => handleNetworkChange('mainnet')}>mainnet</button></li>
                <li><button className="dropdown-item header-network-testnet" onClick={() => handleNetworkChange('testnet')}>testnet</button></li>
                <li><button className="dropdown-item header-network-devnet" onClick={() => handleNetworkChange('devnet')}>devnet</button></li>
              </ul>
            </div>
            <div className="dropdown ms-1 pe-5">
              <button className="btn btn-secondary dropdown-toggle header-account" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {printAddress(accountName)}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">

                <li><button className="dropdown-item header-select-account" onClick={() => setAccountName('0x0000000')}>Acc_Names</button></li>

                {/* <li><button className="dropdown-item header-add-account" onClick={() => addAccount()}>Add Account</button></li>
                <li><button className="dropdown-item header-create-account" onClick={() => createAccount()}>Create Account</button></li> */}
              </ul>
            </div>
            <button className='btn btn-primary' onClick={() => {
              connect(snapId).then(async (result) => {
                if (result) {
                  setReconnect(true);
                  setACTIVE(true);
                } else {
                  setReconnect(false);
                  setACTIVE(false);
                }
              })
            }}>
              {reconnect ? 'Reconnect' : 'Connect'}
            </button>

            <button className='btn btn-primary' onClick={() => {
              createAccount(snapId).then(async (result) => {
                if (result) {
                  switchAccount(snapId).then(async (result2) => {
                    if (result2) {
                      console.log("switched account")
                    }
                  })
                }
              })
            }}>
              {'Create & Switch Account'}
            </button>

            <button className='btn btn-primary' onClick={() => {
              getAddress(snapId).then(async (result) => {
                setAccountName(result);
                setADDR(result);
              }
              )
            }
            }>
              Get Address
            </button>
          </ul>
        </div>
      </nav>
    </header>
  );
};