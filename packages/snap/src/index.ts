import { OnRpcRequestHandler } from '@metamask/snap-types';
import {AptosAccount, AptosClient, CoinClient, FaucetClient} from 'aptos'
import { getAccount } from './Wallet/Accounts';
import {createParams, transferParams} from './Utils/interfaces';
import { HexString } from 'aptos';
import { NetworkRequest } from './Utils/networkClient';
import { WalletFuncs } from './Wallet/WalletFuncs';
import { Metamask } from './Utils/Metamask';

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
      const createParam= request.params as unknown as createParams;
      let id=createParam.id;
      let net=createParam.network;
      let newUser=await getAccount(id);
      let walletfunction;
      if(net=="mainnet")
        walletfunction = new WalletFuncs(newUser, "mainnet");
      else if(net=="testnet")
        walletfunction = new WalletFuncs(newUser, "testnet");
      else
       walletfunction = new WalletFuncs(newUser, "devnet");
        
      console.log("New user")
      console.log(newUser)
      console.log("Walletfunction")
      console.log(walletfunction)      
      return newUser.address().toString();
    case 'switchAccount':
        const param= request.params as unknown as createParams;
        let switchId=param.id;
        network=param.network;
        userAccount=await getAccount(switchId);
        if(param.network=="mainnet")
        walletfunctions = new WalletFuncs(userAccount, "mainnet");
      else if(param.network=="testnet")
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
      await fetch(devNetFaucetUrl+"/mint"+"?address="+HexString.ensure(userAccount.address().toString()).noPrefix()+"&amount=10000000", {method:"post"})
      return true;
    case 'getBalance':
      return await walletfunctions.getAptosBalance()
    
    case 'dispBalance':
      return await Metamask.displayBalance(BigInt(await walletfunctions.getAptosBalance()), userAccount.address().toString(), network)
      
    case 'transfer':
      const params = request.params as unknown as transferParams;
      let toAccount =  params.to
      let Amount = BigInt(params.amount);
      const output = await walletfunctions.transfer(toAccount, Amount);
      return output
      
    case 'getModules':
      console.log("index: getAM");
      return await Metamask.sendAlert();
      // return await walletfunctions.getAccountModules();

    case 'getResources':
      console.log("index: getAM");
      return await walletfunctions.getResources();

    
      
    default:
      throw new Error('Method not found.');
  }
};

