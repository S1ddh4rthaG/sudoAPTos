import React, { useEffect, useState } from 'react';
import { connect, getAddress, createAccount, switchAccount, setStorage, getStorage, clearStorage } from '../methods/index';

import { WalletContext } from '../context/WalletContext';
import { printAddress } from '../utils/functionals';


export const Header = () => {
  const [reconnect, setReconnect] = useState(false);
  const [network, setNetwork] = useState('devnet');
  const [accountName, setAccountName] = useState('Account');
  const [accountID, setAccountID] = useState(0);
  const [snapId, setSnapId] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);

  const { setSNAP_ID } = React.useContext(WalletContext);
  const { ACTIVE, setACTIVE } = React.useContext(WalletContext);
  const { ADDR, setADDR } = React.useContext(WalletContext);
  const { setNETWORK } = React.useContext(WalletContext);

  useEffect(() => {
    const snapID = `local:http://localhost:8080`
    setSnapId(snapID);
    setSNAP_ID(snapID);

  }, []);

  const handleNetworkChange = (network: string) => {
    setNetwork(network);
    switchAccount(snapId, selectedAccount, network ).then(
      async (result) => {
        console.log("Switched network:", result, network);
      })
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
              <button className="btn btn-secondary dropdown-toggle header-account" type="button" data-bs-toggle="dropdown" aria-expanded="false"
                onClick={() => {
                  if (ACTIVE)
                    getStorage(snapId).then((result) => {
                      if (result) {
                        setAccounts(result['accounts'].data);
                      }
                    })
                }}
              >
                {printAddress(accountName)}
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                {accounts.map(account => {
                  return (
                    <li key={`${account.id}li`}>
                      <button
                        key={account.id}
                        className={`dropdown-item`}
                        onClick={() => {
                          switchAccount(snapId, account.id, network | "devnet").then(
                            async (result) => {
                              if (result) {
                                setAccountName(account.address);
                                setADDR(account.address);
                                setSelectedAccount(account.id);
                              }
                            })
                        }}
                      >
                        {printAddress(account.address)}
                      </button>
                    </li>)
                })}
              </ul>
            </div>
            <button className='btn btn-primary me-1' onClick={() => {
              clearStorage(snapId).then(async (result) => {
                if (result) {
                  setAccounts([]);
                }
              })
            }
            }>
              <i className={"ms-2 me-2 p-1 bi bi-box-arrow-in-left"}></i>
              Clear
            </button>


            <button className='btn btn-primary me-1' onClick={() => {
              createAccount(snapId).then(async (result) => {
                if (result >= 0) {
                  const acc = [...accounts, { id: result, address: JSON.parse(localStorage.getItem(result)).address }];
                  setAccounts(acc);

                  console.log("Storing accounts:", acc);
                  setStorage(snapId, acc).then((result) => {
                    console.log("Retrieved accounts:", result);
                  })


                  switchAccount(snapId, result, network | "devnet").then(async (result2) => {
                    if (result2) {
                      const addr = JSON.parse(localStorage.getItem(result)).address;
                      setAccountName(addr);
                      setADDR(addr);
                      setSelectedAccount(addr);
                    }
                  })
                }
              })
            }}>
              {'Add Account'}
            </button>

            <button className={'btn btn-primary me-1 fw-bold ' + (reconnect ? 'bg-primary' : 'bg-success')}
              onClick={() => {
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

            {/* <button className='btn btn-primary me-1' onClick={() => {
              getAddress(snapId).then(async (result) => {
                setAccountName(result);
                setADDR(result);
              })
            }
            }>
              Get Address
            </button> */}
          </ul>
        </div>
      </nav>
    </header>
  );
};