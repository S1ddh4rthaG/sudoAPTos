import { connect, getAddress, switchAccount, createAccount, getBalance, fundAccount, getAccountModules } from '../../methods/index';
import { useEffect, useState, useContext } from 'react';

import { WalletContext } from '../../context/WalletContext';
import { TitleBar } from '../TitleBar';
import { JSONview } from '../JSONview';

export const Module = ({ isActive }) => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);

  const [modules, setModules] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (isActive && ACTIVE) {
      getAccountModules(SNAP_ID).then((result) => {
        console.log(result);
        setModules(result);
        setDone(true);
      });
    }
  }, [isActive]);


  return (
    <>
      <TitleBar title="Modules" />
      {done || true ? (
        <div className="container m-0 p-0 mt-3">
          <div className="row m-0 p-0">
            <div className="col m-0 p-0">
              <div className="card p-0 m-0 border-0 bg-2">
                <div className="card-body">
                  {/* <p className="card-text">{JSON.stringify(modules)}</p> */}
                  {
                    Array.isArray(modules) ?
                      (
                        <JSONview json={modules} />
                      ) :
                      (
                        <tr className='text-center'>
                          <td colSpan={8}>
                            <span className="badge bg-danger">No modules found</span>
                            <p>The Account address might not be used in any transaction yet.</p>
                          </td>
                        </tr>
                      )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container m-0 p-0 mt-3">
          <div className="row m-0 p-0">
            <div className="col m-0 p-0">
              <div className="card p-0 m-0 border-0">
                <div className="card-body p-2 bg-2 text-center">
                  <h5 className="card-title">Resources</h5>
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>

  )
}