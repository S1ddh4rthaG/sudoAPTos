import { HexString } from 'aptos';
import { NetworkRequest } from './networkClient';

export class SimpleClient {
  baseURL: string;

  network: 'mainnet' | 'testnet' | 'devnet';

  networks;

  constructor(network: 'mainnet' | 'testnet' | 'devnet') {
    this.networks = {
      mainnet: { url: 'https://fullnode.mainnet.aptoslabs.com/v1', id: 1 },
      testnet: { url: 'https://fullnode.testnet.aptoslabs.com/v1', id: 2 },
      devnet: { url: 'https://fullnode.devnet.aptoslabs.com/v1', id: null },
    };
    this.baseURL = this.networks[network].url;
    this.network = network;
  }

  async getSequenceNumber(address: HexString): Promise<bigint> {
    console.log('here');
    const formattedAddress: string = address.toString().slice(2);
    const backString = `/accounts/${formattedAddress}`;
    const jsonOutput = await NetworkRequest.get(this.baseURL + backString);
    console.log(jsonOutput);
    const sequenceNumber = jsonOutput.sequence_number;
    console.log(sequenceNumber);
    return BigInt(sequenceNumber);
  }

  async getGasEstimate(priority?: 'low' | 'avg' | 'high'): Promise<bigint> {
    const backString = '/estimate_gas_price';
    let key;
    if (priority === 'low') {
      key = 'deprioritized_gas_estimate';
    } else if (priority === 'high') {
      key = 'prioritized_gas_estimate';
    } else {
      key = 'gas_estimate';
    }
    const jsonOutput = await NetworkRequest.get(this.baseURL + backString);
    console.log(jsonOutput);
    console.log(key);
    return BigInt(jsonOutput[key]);
  }

  async getChainId(): Promise<number> {
    if (this.network === 'devnet') {
      return (await NetworkRequest.get(this.baseURL)).chain_id;
    }
    return this.networks[this.network].id;
  }

  async getBalance(address: string, coin: string): Promise<string> {
    address = address.slice(2);
    return (
      await NetworkRequest.get(
        `${this.baseURL}/accounts/${address}/resource/${coin}`,
      )
    ).data.coin.value;
  }



  async postTxn(txn: Uint8Array) {
    console.log('inside post Txn');
    const json = await NetworkRequest.postBytes(
      `${this.baseURL}/transactions`,
      txn,
    );
    console.log('done posting');
    return json;
  }



  //// New functions /////

  /*Accounts*/
  async getAccount(address:string){
    return (
      await NetworkRequest.get(`${this.baseURL}/accounts/${address}`)
    )
  }
  
  async getAccountResources(address:string){
    return (
      await NetworkRequest.get(`${this.baseURL}/accounts/${address}/resources`)
    )
  }
  async getAccountModules(address:string){
    return (
      await NetworkRequest.get(`${this.baseURL}/accounts/${address}/modules`)
    )
  }

//   async getAccountResource(address:string,resource_type:string){
//     return (
//       await NetworkRequest.get(`${this.baseURL}/accounts/${address}/resource/${resource_type}`)
//     )
//   }

//   async getAccountModule(address:string,module_name:string){
//     return (
//       await NetworkRequest.get(`${this.baseURL}/accounts/${address}/module/${module_name}`)
//     )
//   }

//   /*Blocks*/
//   async getBlockByHeight(block_height:bigint ){
//     return (
//       await NetworkRequest.get(`${this.baseURL}/blocks/by_height/${block_height}`)
//     )
//   }

//   async getBlockByVersion(version:bigint ){
//     return (
//       await NetworkRequest.get(`${this.baseURL}/blocks/by_version/${version}`)
//     )
//   }


//   /*Events*/
//   async getEventsByCreationNumber(address:string,creation_number:string){
//     return (
//       await NetworkRequest.get(`${this.baseURL}/accounts/${address}/events/${creation_number}`)
//     )
//   }
//   async getEventsByEventHandle(address:string,event_handle:string,field_name:string){
//     return (
//       await NetworkRequest.get(`${this.baseURL}/accounts/${address}/events/${event_handle}/${field_name}`)


//   /*General*/
//   /*Tables*/
//   /*Transaction*/
//   /*Views*/


}
