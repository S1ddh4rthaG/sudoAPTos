export const connect = async (snapId: any) => {
  console.log('Connect Wallet');
  localStorage.clear();

  let result;
  try {
    result = await window.ethereum.request({
      method: 'wallet_requestSnaps',
      params: {
        [snapId]: {}
      }
    });
  } catch (e) {
    console.log(e)
    return false;
  }

  console.log(result);
  return true;
}

export const switchAccount = async (snapId: any,id: number) => {
  let net = "devnet"

  console.log("switch account")
  try {
    const out = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method: 'switchAccount',
          params: {
            id: id,
            network: net
          }
        }
      }
    })
  } catch (err) {
    console.error(err)
    alert('Problem happened: ' + err.message || err)

    return false;
  }

  return true;
}

export const createAccount = async (snapId: any) => {

  try{
  const id= await ethereum.request({
          method: 'wallet_invokeSnap',
          params: {
            snapId,
            request: {
              method: 'getId'
            }
          }
        });;
  let net = "devnet";

  console.log('create account');

  try {
    const out = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method: 'createAccount',
          params: {
            id: id,
            network: net
          }
        }
      }
    })

    let value = { address: out }
    const jsonString = JSON.stringify(value);
    localStorage.setItem(id.toString(), jsonString)
    

  } catch (err) {
    console.error(err)
    alert('Problem happened: ' + err.message || err)
    return -1;
  }

  return id;

}
catch (err) {
    console.error(err)
    alert('Problem happened: ' + err.message || err)
    return false;
  }
}

export const getAddress = async (snapId: any) => {
  console.log('get address');

  try {
    const out = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method: 'getAddress',
        }
      }
    })

    console.log(out);
    return out;
  } catch (err) {
    console.error(err)
    alert('Problem happened: ' + err.message || err)
  }

  return '0x0000000';
}

export const showBalance = async (snapId: any) => {
  try {
    const out = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method: 'dispBalance'
        }
      }
    })
    console.log(out);
  } catch (err) {
    console.error(err)
    alert('Problem happened: ' + err.message || err)
  }
}

export const getBalance = async (snapId) => {
  try {
    const out = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method: 'getBalance'
        }
      }
    })
    console.log(out);
    return out;
  } catch (err) {
    console.error(err)
    alert('Problem happened: ' + err.message || err)
  }

  return -1;
}

export const fundAccount = async (snapId: any) => {
  const result = await ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      snapId: snapId,
      request: {
        method: 'fund'
      }
    }
  })
  if (result == true) {
    alert("account succesfully funded (devnet)");
  }
  else {
    alert("an error occured while funding this account");
  }
  console.log(result);

}

export const getAccountResources = async (snapId: any) => {
  console.log('get account resources')
  try {
    const out = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method: 'getAccountResources'
        }
      }
    })
    console.log(out);
    return out;
  } catch (err) {
    console.error(err)
    alert('Problem happened: ' + err.message || err)
  }
}

export const getAccountTransactions = async (snapId: any) => {
  console.log('get account transactions')
  try {
    const out = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method: 'getAccountTransactions'
        }
      }
    })
    console.log(out);
    return out;
  } catch (err) {
    console.error(err)
    alert('Problem happened: ' + err.message || err)
  }
}

export const getAccountTransactionbyHash = async (snapId: any) => {
  console.log('get account transaction by Hash')
  try {
    const out = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method: 'getAccountTransactionbyHash'
        }
      }
    })
    console.log(out);
    return out;
  } catch (err) {
    console.error(err)
    alert('Problem happened: ' + err.message || err)
  }
}

export const transfer = async (snapId: any,address:string,amount:string) => {
  console.log('transfer')
  try {
    const out = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method: 'transfer',
          params: {
            to: address,
            amount: amount
          }
        }
      }
    })
    console.log(out);
    return out;
  } catch (err) {
    console.error(err)
    alert('Problem happened: ' + err.message || err)
  }
}

// async function transfer()
//   let address = document.getElementById('address').value;
//   let amount = document.getElementById('amount').value;
//   const out = await ethereum.request({
//       method: 'wallet_invokeSnap',
//       params: {
//         snapId, 
//         request: {
//         method: 'transfer',
//         params: {
//           to: address,
//           amount: amount
//         }
//       }
//     }
//   })
//   console.log(out);
//   // const parent = document.getElementById("transactions")
//   // const link = document.createElement('a');
//   // link.innerText = `https://fullnode.devnet.aptoslabs.com/v1/transactions/by_hash/${out.hash}`
//   // link.href= `https://fullnode.devnet.aptoslabs.com/v1/transactions/by_hash/${out.hash}`
//   // parent.appendChild(link);
// }


export const getAccountModules = async (snapId: any) => {
  console.log('get account modules')
  try {
    const out = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method: 'getAccountModules'
        }
      }
    })
    console.log(out);
    return out;
  } catch (err) {
    console.error(err)
    alert('Problem happened: ' + err.message || err)
  }
}
