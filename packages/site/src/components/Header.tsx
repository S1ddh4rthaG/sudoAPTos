import React, { useEffect, useState } from 'react';
import { connect, getAddress, createAccount, switchAccount } from '../methods/index';

import { WalletContext } from '../context/WalletContext';
import { printAddress } from '../utils/functionals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export const Header = () => {
  const [reconnect, setReconnect] = useState(false);
  const [network, setNetwork] = useState('devnet');
  const [accountName, setAccountName] = useState('Account');
  const [snapId, setSnapId] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);

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
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Select Account
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {accounts.map(account => {
                    return (
                      <li>
                      <button
                        key={account.id}
                        className={`dropdown-item header-select-account ${account.id === selectedAccount ? 'active' : ''
                          }`}
                        onClick={() => { switchAccount(snapId, account.id) }}
                      >
                        {account.address}
                      </button>
                      </li>
                    )
                  }
                  )
                  }

                </div>
              </div>
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
                if (result >= 0) {
                  setAccounts([...accounts, { id: result, address: JSON.parse(localStorage.getItem(result)).address }]);
                  console.log("accounts ", accounts)
                  console.log(localStorage.getItem(result))
                  console.log("Line break")
                  console.log()
                  switchAccount(snapId, result).then(async (result2) => {
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