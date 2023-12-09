export const connect = async (snapId: any) => {
  console.log('Connect Wallet');

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

export const switchAccount = async (snapId: any) => {
  let id = 3;
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
  let id = 2;
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
    return false;
  }

  return true;
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