// import { createContext } from "react";

// // Create a context for the Wallet: snapID, active, address, network
// export const WalletContext = createContext({
//   snapID: "",
//   active: false,
//   address: "",
//   network: "",
// });

import { useState, FunctionComponent } from "react";
import { WalletContext } from "./WalletContext";

export const WalletContextProvider: FunctionComponent = ({ children }) => {
  const [SNAP_ID, setSNAP_ID] = useState("");
  const [ACTIVE, setACTIVE] = useState(false);
  const [ADDR, setADDR] = useState("");
  const [NETWORK, setNETWORK] = useState("");

  return (
    <WalletContext.Provider
      value={{
        SNAP_ID,
        setSNAP_ID,
        ACTIVE,
        setACTIVE,
        ADDR,
        setADDR,
        NETWORK,
        setNETWORK,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};