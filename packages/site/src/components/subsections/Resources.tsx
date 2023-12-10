import React, { useEffect, useState, useContext } from 'react';
import { getAccountResources } from '../../methods/index';
import { WalletContext } from '../../context/WalletContext';

export const Resources = ({ isActive }) => {
  const { SNAP_ID } = useContext(WalletContext);
  const [resources, setResources] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Fetch account info when the component becomes active
    if (isActive) {
      getAccountResources(SNAP_ID).then((result) => {
        console.log(result);
        setResources(result);
        setDone(true);
      });
    } else {
      // Reset the dropdown when the tab is not active
      setSelectedType('');
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
                  <div className="mb-3">
                    <label htmlFor="resourceType" className="form-label">Select Resource Type:</label>
                    <select
                      className="form-select"
                      id="resourceType"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="" disabled>Select a resource type</option>
                      {resources.map((resource, index) => (
                        <option key={index} value={resource.type}>{resource.type}</option>
                      ))}
                    </select>
                  </div>
                  {selectedType ? (
                    <div>
                      {/* <h6>{selectedType}</h6> */}
                      <pre>{JSON.stringify(resources.find(resource => resource.type === selectedType)?.data, null, 2)}</pre>
                    </div>
                  ) : (
                    <p>Please select a resource type from the dropdown</p>
                  )}
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
                <div className="card-body text-center">
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
