import { OnRpcRequestHandler } from '@metamask/snap-types';
import { AptosAccount, AptosClient, CoinClient, FaucetClient } from 'aptos'
import { getAccount } from './Wallet/Accounts';
import { createParams, transferParams } from './Utils/interfaces';
import { HexString } from 'aptos';
import { NetworkRequest } from './Utils/networkClient';
import { WalletFuncs } from './Wallet/WalletFuncs';
import { Metamask } from './Utils/Metamask';
import { balanceCheck, lastTransactionCheck } from './cron';

//Global variables to maintain state of the current account and the net

let userAccount;
let walletfunctions;
let network;

export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {

  const devNetFaucetUrl = "https://faucet.devnet.aptoslabs.com";
  console.log("hello")
  // console.log(userAccount);

  // let userAccount = await getAccount(2);
  // let walletfunctions = new WalletFuncs(userAccount, "devnet");

  switch (request.method) {
    case 'createAccount':
      console.log("In create account method")
      const createParam = request.params as unknown as createParams;
      let id = createParam.id;
      let net = createParam.network;
      let newUser = await getAccount(id);
      let walletfunction;
      if (net == "mainnet")
        walletfunction = new WalletFuncs(newUser, "mainnet");
      else if (net == "testnet")
        walletfunction = new WalletFuncs(newUser, "testnet");
      else
        walletfunction = new WalletFuncs(newUser, "devnet");

      console.log("New user")
      console.log(newUser)
      console.log("Walletfunction")
      console.log(walletfunction)
      return newUser.address().toString();
    case 'switchAccount':
      const param = request.params as unknown as createParams;
      let switchId = param.id;
      network = param.network;
      userAccount = await getAccount(switchId);
      if (param.network == "mainnet")
        walletfunctions = new WalletFuncs(userAccount, "mainnet");
      else if (param.network == "testnet")
        walletfunctions = new WalletFuncs(userAccount, "testnet");
      else
        walletfunctions = new WalletFuncs(userAccount, "devnet");
      console.log("Finished switch")
      console.log(userAccount)
      console.log(walletfunctions)
      return;
    case 'getAddress':
      console.log(userAccount)
      return userAccount.address().toString();
    case 'fund':
      await fetch(devNetFaucetUrl + "/mint" + "?address=" + HexString.ensure(userAccount.address().toString()).noPrefix() + "&amount=10000000", { method: "post" })
      return true;
    case 'getBalance':
      // console.log("index.ts: Log Balance")
      return await walletfunctions.getAptosBalance()

    case 'dispBalance':
      return await Metamask.displayBalance(BigInt(await walletfunctions.getAptosBalance()), userAccount.address().toString(), network)

    case 'transfer':
      const params = request.params as unknown as transferParams;
      let toAccount = params.to
      let Amount = BigInt(params.amount);
      const output = await walletfunctions.transfer(toAccount, Amount);
      return output

    // case 'getModules':
    //   console.log("index: getAM");
    //   return await Metamask.sendAlert();
    //   // return await walletfunctions.getAccountModules();

    // case 'getResources':
    //   console.log("index: getAM");
    //   return await walletfunctions.getResources();

    /*Accounts */

    case 'getAccount':
      console.log("index: getAccount");
      return await walletfunctions.getAccount();

    case 'getAccountResources':
      console.log("index: getAccountResources");
      return await walletfunctions.getAccountResources();

    case 'getAccountModules':
      console.log("index: getAccountModules");
      return await walletfunctions.getAccountModules();

    case 'getAccountResource':
      console.log("index: getAccountResource");
      const resource_type: string = request.params.resource_type;
      return await walletfunctions.getAccountResource(resource_type);

    case 'getAccountModule':
      console.log("index: getAccountModule");
      const module_name: string = request.params.module_name;
      return await walletfunctions.getAccountModule(module_name);

    /*Transactions */
    case 'getTransactions':
      console.log("index: getTransactions");
      return await walletfunctions.getTransactions();

    case 'getTransactionByHash':
      console.log("index: getTransactionByHash");
      const txn_hash: string = request.params.txn_hash;
      return await walletfunctions.getTransactionByHash(txn_hash);

    case 'getTransactionByVersion':
      console.log("index: getTransactionByVersion");
      const txn_version: string = request.params.txn_version;
      return await walletfunctions.getTransactionByVersion(txn_version);

    case 'getAccountTransactions':
      console.log("index: getAccountTransactions");
      return await walletfunctions.getAccountTransactions();

    case 'estimateGasPrice':
      console.log("index: estimateGasPrice");
      return await walletfunctions.estimateGasPrice();



    default:
      throw new Error('Method not found.');
  }
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case 'transactionCheck':{
      if (!userAccount) return;
    
      const transactions = await walletfunctions.getAccountTransactions();
    
      const k = Math.min(5, transactions.length);
      const lastKTransactions = transactions.slice(0, k);
      let s = ""
      for (let i = 0; i < lastKTransactions.length; i++) {
        s += lastKTransactions[i].success ? "✅ " : "❌ "
      }

      return await snap.request({
        method: 'snap_notify',
        params: {
            type: 'inApp',
            message: 'Transaction Status: ' + s,
          },
        });
    }

    case 'balanceCheck':{
      if (!userAccount) return;

      return await snap.request({
        method: 'snap_notify',
        params: {
            type: 'inApp',
            message: 'Balance: ' + await walletfunctions.getAptosBalance() + ' octo-APT'
          },
        });
    }


    default:
      throw new Error('Method not found. Please check your manifest. ' + request.method);
  }
};

export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  const insights = await getDetails(transaction);

  return {
    insights,
  };
};