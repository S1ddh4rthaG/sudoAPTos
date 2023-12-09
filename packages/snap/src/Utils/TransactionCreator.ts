import {
  TransactionBuilderABI,
  HexString,
  TxnBuilderTypes,
  AptosAccount,
} from 'aptos';

import { COIN_ABIS } from '../ABI/abis';
import { SimpleClient } from './SimpleClient';

const DEFAULT_MAX_GAS_AMOUNT = BigInt(20000);
const DEFAULT_Txn_TIMEOUT = 20;

type configObj = {
  MaxGasAmmount?: bigint;
  gasUnitPrice?: bigint;
  priority?: 'low' | 'avg' | 'high';
};

export class TransactionCreator {
  client: SimpleClient;

  constructor(client: SimpleClient) {
    this.client = client;
  }

  static buildCoinTransferTxnPayload(
    address: string,
    amount: bigint,
    coinTypeToTransfer: string,
  ): TxnBuilderTypes.TransactionPayload {
    const HexAddress = new HexString(address);
    const txnBuilder = new TransactionBuilderABI(
      COIN_ABIS.map((abi) => new HexString(abi).toUint8Array()),
    );
    const payload = txnBuilder.buildTransactionPayload(
      '0x1::coin::transfer',
      [coinTypeToTransfer],
      [HexAddress, amount],
    );
    return payload;
  }

  static buildRemotePayload(){
    
  }

  static buildTransferPayload(
    address: string,
    amount: bigint,
  ): TxnBuilderTypes.TransactionPayload {
    const coin = '0x1::aptos_coin::AptosCoin';
    return TransactionCreator.buildCoinTransferTxnPayload(
      address,
      amount,
      coin,
    );
  }

  async buildRawTransactionFromPayload(
    sender: AptosAccount,
    payload: TxnBuilderTypes.TransactionPayload,
    config?: configObj,
  ): Promise<TxnBuilderTypes.RawTransaction> {
    const sequenceNumber = await this.client.getSequenceNumber(
      sender.address(),
    );
    console.log(sequenceNumber);
    const maxGasAmount = DEFAULT_MAX_GAS_AMOUNT;
    const gasUnitPrice = await this.client.getGasEstimate();
    const expireTimestamp = BigInt(
      Math.floor(Date.now() / 1000) + DEFAULT_Txn_TIMEOUT,
    );
    const chainId = new TxnBuilderTypes.ChainId(await this.client.getChainId());
    return new TxnBuilderTypes.RawTransaction(
      TxnBuilderTypes.AccountAddress.fromHex(sender.address()),
      sequenceNumber,
      payload,
      maxGasAmount,
      gasUnitPrice,
      expireTimestamp,
      chainId,
    );
  }
}
