import React, { useEffect, useState, useContext } from 'react';
import { getAccountResources } from '../../methods/index';
import { WalletContext } from '../../context/WalletContext';
import { TitleBar } from '../TitleBar';
import { JSONview } from '../JSONview';

export const Resources = ({ isActive }) => {
  const { SNAP_ID } = useContext(WalletContext);
  const { ACTIVE } = useContext(WalletContext);
  const { ADDR } = useContext(WalletContext);
  const { NETWORK } = useContext(WalletContext);
  
  const [resources, setResources] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (isActive && ACTIVE) {
      getAccountResources(SNAP_ID).then((result) => {
        console.log(result);
        setResources(result);
        setDone(true);
      });
    } else {
      setSelectedType('');
    }
  }, [isActive]);

  return (
    <>
      <TitleBar title="Resources" />

      {done ? (
        <div className="container m-0 p-0 mt-3">
          <div className="row m-0 p-0">
            <div className="col m-0 p-0">
              <div className="card p-0 m-0 border-0">
                <div className="card-body p-2 bg-2">
                  <div className="mb-3">
                    <label htmlFor="resourceType" className="form-label">Select Resource Type:</label>
                    <select
                      className="form-select"
                      id="resourceType"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="" disabled>Select a resource type</option>
                      {resources?.map((resource, index) => (
                        <option key={index} value={resource.type}>{resource.type}</option>
                      ))}
                    </select>
                  </div>
                  {selectedType ? (
                    <div>
                      {/* <h6>{selectedType}</h6> */}
                      {/* <pre>{JSON.stringify(resources.find(resource => resource.type === selectedType)?.data, null, 2)}</pre> */}
                      <JSONview json={resources?.find(resource => resource.type === selectedType)?.data} />
                    </div>
                  ) : (
                    <p className='text-center'>Select A Resource Type</p>
                  )}
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
  );
};
