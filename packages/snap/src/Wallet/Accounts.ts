
import { getBIP44AddressKeyDeriver, JsonBIP44CoinTypeNode} from '@metamask/key-tree';
import { AptosAccount } from 'aptos';

export async function getAccount(path: number): Promise<AptosAccount> {

  const aptosCoinNode = (await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 637,
    },
  })) as JsonBIP44CoinTypeNode;

  // Next, we'll create an address key deriver function for the Dogecoin coin_type node.
  // In this case, its path will be: m / 44' / 3' / 0' / 0 / address_index
  
  const deriveDogecoinAddress = await getBIP44AddressKeyDeriver(aptosCoinNode);
  const derivedAccount = await deriveDogecoinAddress(path);
  const Account = new AptosAccount(derivedAccount.privateKeyBytes);
  console.log(Account.toPrivateKeyObject());
  return Account;
}
