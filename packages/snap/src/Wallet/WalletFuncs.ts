import {
  AptosAccount,
  TransactionBuilderEd25519,
  TxnBuilderTypes,
} from 'aptos';

import { SimpleClient } from '../Utils/SimpleClient';
import { TransactionCreator } from '../Utils/TransactionCreator';
import { Metamask } from '../Utils/Metamask';

const nacl = require('tweetnacl');

export class WalletFuncs {
  account: AptosAccount;

  client: SimpleClient;

  txnSigner: TransactionBuilderEd25519;

  txnCreator: TransactionCreator;

  network: 'mainnet' | 'testnet' | 'devnet';

  constructor(
    account: AptosAccount,
    network: 'mainnet' | 'testnet' | 'devnet',
  ) {
    this.account = account;
    this.client = new SimpleClient(network);
    this.txnCreator = new TransactionCreator(this.client);
    this.network = network;
    this.txnSigner = WalletFuncs.getSigner(account);
  }

  static getSigner(account: AptosAccount) {
    return new TransactionBuilderEd25519(
      (signingMessage: TxnBuilderTypes.SigningMessage) => {
        // @ts-ignore
        const sigHexStr = account.signBuffer(signingMessage);
        return new TxnBuilderTypes.Ed25519Signature(sigHexStr.toUint8Array());
      },
      account.pubKey().toUint8Array(),
    );
  }

  async transfer(address: string, amount: bigint | string | number) {
    const amount_bigint : bigint = BigInt(amount);
    console.log('here');
    
    const confirm = await Metamask.paymentConfirmation(amount_bigint, address, "devnet");
    if (!confirm) {
      return Metamask.throwError(4300, 'user rejected request');
    }
    console.log('passed confirm');
    const payload = TransactionCreator.buildTransferPayload(address, amount_bigint);
    console.log('passed payload creation');
    const rawTransferTxn = await this.txnCreator.buildRawTransactionFromPayload(
      this.account,
      payload,
    );
    console.log('passed raw transaction creation');
    const sig = this.txnSigner.sign(rawTransferTxn);
    console.log('passed signature');
    return await this.client.postTxn(sig);
  }

  async getAptosBalance(): Promise<string> {
    const coin = '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>';
    const address = this.account.address().toString();
    return await this.client.getBalance(address, coin);
  }

  async displayAlert() {
    return await this.client.sendAlert();
  }

  /*Accounts */
  
  async getAccount(){
    return await this.client.getAccount(this.account.address().toString());
  }

  async getAccountResources(){
    return await this.client.getAccountResources(this.account.address().toString());
  }
  
  async getAccountModules(){
    return await this.client.getAccountModules(this.account.address().toString());
  }

  async getAccountResource(resource_type:string){
    return await this.client.getAccountResource(this.account.address().toString(),resource_type);
  }

  async getAccountModule(module_name:string){
    return await this.client.getAccountModule(this.account.address().toString(),module_name);
  }

  /*Blocks */
  
  async getBlockByHeight(block_height:bigint ){
    return await this.client.getBlockByHeight(block_height);
  }

  async getBlockByVersion(version:bigint ){
    return await this.client.getBlockByVersion(version);
  }

  /*Events*/

  async getEventsByCreationNumber(creation_number: string){
    return await this.client.getEventsByCreationNumber(this.account.address().toString(),creation_number);
  }

  async getEventsByEventHandle(event_handle:string,field_name:string){
    return await this.client.getEventsByEventHandle(this.account.address().toString(),event_handle,field_name);
  }



  /*Tables*/

  async getTableItem(table_handle:string,table_item:any){
    return await this.client.getTableItem(table_handle,table_item);
  }

  async getRawTableItem(table_handle:string,table_item:any){
    return await this.client.getRawTableItem(table_handle,table_item);
  }


  /*Transactions*/
  
  async getTransactions(){
    return await this.client.getTransactions();
  }

  async submitTransaction(txn:any){
    return await this.client.submitTransaction(txn);
  }

  async getTransactionByHash(txn_hash:string){
    return await this.client.getTransactionByHash(txn_hash);
  }

  async getTransactionByVersion(txn_version:string){
    return await this.client.getTransactionByVersion(txn_version);
  }

  async getAccountTransactions(){
    return await this.client.getAccountTransactions(this.account.address().toString());
  }

  async submitBatchTransactions(txns:any){
    return await this.client.submitBatchTransactions(txns);
  }

  async simulateTransaction(txn:any){
    return await this.client.simulateTransaction(txn);
  }

  async encodeSubmission(txn:any){
    return await this.client.encodeSubmission(txn);
  }

  async estimateGasPrice(){
    return await this.client.estimateGasPrice();
  }

  /*Views*/
  async executeViewFunctionOfAModule(view:any){
    return await this.client.executeViewFunctionOfAModule(view);
  }

}
