﻿# sudoAPTos MetaMask Snap

### InterIIT Tech Meet 12: Aptos<>MetaMask Snap 
### Problem Statement
>Creation of a MetaMask Snap designed to facilitate seamless user
interaction between MetaMask's array of EVM (Ethereum Virtual Machine) blockchains and the
Aptos blockchain.

### Motivation
Currently, Aptos is not natively supported by MetaMask. Through the use of **sudoAptos** users can seamlessly engage with the Aptos blockchain thereby promoting collaboration between communities.

### Features of App
- Support for multiple accounts
- Integrated all Aptos API features over all three networks: testnet, devnet, mainnet
- Uses custom UI dialog boxes
- Cron jobs for regularly notifying the user about the balance and status of last 5 transactions.

### Getting Started
#### Frontend
- Clone the repository
- Run the below commands to start the app
```shell
  yarn install
  yarn start
```

#### Snap
- Run the below commands to start the snap
  ```shell
  cd packages/snap
  npx mm-snap build
  npx mm-snap serve
  ```

#### **Note:** 
Make sure snapID(in _packages/site/src/components/Header.tsx_) is same as port on which the server is running (i.e if is snap is running at localhost port 8080 then snapID is _local:http://localhost:8080_)
