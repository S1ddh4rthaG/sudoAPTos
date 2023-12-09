import { connect, getAddress, switchAccount, createAccount, getBalance, fundAccount } from '../methods/index';
import { useEffect, useState, useContext } from 'react';

import { WalletContext } from '../context/WalletContext';
import { Account } from './subsections/Account';
import { Resources } from './subsections/Resources';
import { Module } from './subsections/Module';
import { Transfer } from './subsections/Transfer';
import { Transactions } from './subsections/Transactions';

export const Main = () => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);

  const [balance, setBalance] = useState(0);


  return (
    <main className="d-flex flex-column flex-fill main">
      <div className="d-flex flex-column flex-fill p-1 ps-3 pe-3">
        <div className="container-fluid d-flex flex-column flex-fill">
          <div className="row mb-2">
            <div className="col-6 text-start p-0 h-100">
              <div className="card shadow-sm bg-2">
                <div className="card-body">
                  <h2 className="card-title">Wallet Address</h2>
                  <h6 className="card-text main-address">{ADDR}</h6>
                </div>
              </div>
            </div>
            <div className="col-3 text-center">
              <button className="btn btn-primary btn-lg mt-3" onClick={() => {
                fundAccount(SNAP_ID).then((result) => {
                  console.log(result);
                });
              }
              }>Fund Account</button>
            </div>
            <div className="card col-3 text-start shadow-sm bg-2" onClick={() => {
              getBalance(SNAP_ID).then((balance) => {
                console.log(balance);
                setBalance(balance);
              })
            }
            }>
              <div className="card-body">
                <h5 className="card-title">Balance</h5>
                <p className="card-text main-balance"><span className="fw-bold me-2">{balance}</span><span>octo-APT</span></p>
              </div>
            </div>
          </div>
          <div className="row mt-3 flex-fill bg-2 rounded shadow-sm">
            <div className="d-flex p-0">
              <div className="nav nav-pills pe-2 bg-1 rounded-0">
                <div id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <button className="nav-link active text-start pt-3 pb-3 fs-5" style={{ width: "250px" }} id="v-pills-account-tab" data-bs-toggle="pill" data-bs-target="#v-pills-account" type="button" role="tab" aria-controls="v-pills-account" aria-selected="true"><i className="m-2 bi bi-person-rolodex"></i>Account</button>
                  <button className="nav-link text-start pt-3 pb-3 fs-5" style={{ width: "250px" }} id="v-pills-transactions-tab" data-bs-toggle="pill" data-bs-target="#v-pills-transactions" type="button" role="tab" aria-controls="v-pills-transactions" aria-selected="false"><i className="m-2 bi bi-card-checklist"></i>Transactions</button>
                  <button className="nav-link text-start pt-3 pb-3 fs-5" style={{ width: "250px" }} id="v-pills-transfer_fund-tab" data-bs-toggle="pill" data-bs-target="#v-pills-transfer_fund" type="button" role="tab" aria-controls="v-pills-transfer_fund" aria-selected="false"><i className="m-2 bi bi-send"></i>Transfer/Fund</button>
                  <button className="nav-link text-start pt-3 pb-3 fs-5" style={{ width: "250px" }} id="v-pills-resources-tab" data-bs-toggle="pill" data-bs-target="#v-pills-resources" type="button" role="tab" aria-controls="v-pills-resources" aria-selected="false"><i className="m-2 bi bi-segmented-nav"></i>Resources</button>
                  <button className="nav-link text-start pt-3 pb-3 fs-5" style={{ width: "250px" }} id="v-pills-modules-tab" data-bs-toggle="pill" data-bs-target="#v-pills-modules" type="button" role="tab" aria-controls="v-pills-modules" aria-selected="false"><i className="m-2 bi bi-box"></i>Modules</button>
                </div>
              </div>
              <div className="tab-content w-100 h-100 p-2" id="v-pills-tabContent">
                <div className="tab-pane fade show active" id="v-pills-account" role="tabpanel" aria-labelledby="v-pills-account-tab">
                  <Account />
                </div>
                <div className="tab-pane fade" id="v-pills-resources" role="tabpanel" aria-labelledby="v-pills-resources-tab">
                  <Resources />
                </div>
                <div className="tab-pane fade" id="v-pills-modules" role="tabpanel" aria-labelledby="v-pills-modules-tab">
                  <Module />
                </div>
                <div className="tab-pane fade" id="v-pills-transfer_fund" role="tabpanel" aria-labelledby="v-pills-transfer_fund-tab">
                  <Transfer />
                </div>
                <div className="tab-pane fade" id="v-pills-transactions" role="tabpanel" aria-labelledby="v-pills-transactions-tab">
                  <Transactions />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

