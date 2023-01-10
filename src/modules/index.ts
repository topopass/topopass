import { WALLET_TOPO, NETWORK_TOPO } from './wallet'
import {
  LOCAL_STORAGE
} from '../contanst'

export {
  WALLET_TOPO,
  NETWORK_TOPO
}

class TOPOPASS {
  wallet: WALLET_TOPO;

  constructor (wallet: WALLET_TOPO) {
    this.wallet = wallet
  }


  LOGIN (password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const account = localStorage.getItem(LOCAL_STORAGE.TOPOPASS_ACCOUNT_HASH) || ''
      this.wallet.LOGIN_TOPO(account, password)
      .then((res) => {
        resolve(res)
      })
      .catch(() => {
        reject(false)
      })
    })
  }
}
