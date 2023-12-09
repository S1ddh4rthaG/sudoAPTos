import { createContext } from "react";

// Create a context for the Wallet: snapID, active, address, network
export const WalletContext = createContext({
  SNAP_ID: "",
  ACTIVE: false,
  ADDR: "",
  NETWORK: "",
  setSNAP_ID: (snapID: string) => { },
  setACTIVE: (active: boolean) => { },
  setADDR: (addr: string) => { },
  setNETWORK: (network: string) => { },
});