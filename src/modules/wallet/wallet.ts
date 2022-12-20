import { NETWORK_TOPO } from "./network";
import { randomBytes } from "@ethersproject/random";
import { entropyToMnemonic } from "@ethersproject/hdnode";
import { AUTH_TOPO } from "./auth"; 
import { ADDRESS_WALLET } from "./address";
import {
  utils,
  Wallet
} from 'ethers'
import {
  RESPONSE_ACTION_AUTH,
  RESPONSE_GLOBAL
} from '../../contanst'

export class WALLET_TOPO {
  network: NETWORK_TOPO;
  auth: AUTH_TOPO
  address: ADDRESS_WALLET;
  wallet: any;
  walletMnemonic: any;
  password: string;

  constructor (network: NETWORK_TOPO) {
    this.network = network
    this.auth = new AUTH_TOPO('')
    this.address = new ADDRESS_WALLET('')
    this.wallet = null
    this.password = ''
  }

  CREATE_SEED_PHRASE (options: any) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!options) { options = { }; }
        const entropy = randomBytes(16)
        const mnemonic = entropyToMnemonic(entropy, options.locale);

        if (mnemonic) resolve(mnemonic)
        else reject(mnemonic)
      } catch (error) {
        reject(error)
      }
    })
  }

  LOGIN_TOPO (password: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (this.auth) {
        await this.auth.CHECK_AUTH(password)
        .then(async (res) => {
          const wallet = await Wallet.fromMnemonic(res.phrase, res.path)
          if (wallet) {
            this.wallet = wallet.connect(this.network.rpc)
            this.walletMnemonic = wallet
            this.password = password
            resolve(true)
          } else reject(false)
        }).
        catch(() => {
          reject(false)
        })
      }
      reject('error auth!')
    })
  }

  IMPORT_SEED_PHRASE (seedPhrase: string, options: any, password: string): Promise<RESPONSE_ACTION_AUTH> {
    return new Promise(async (resolve, reject) => {
      if (!options) { options = { }; }
      const wallet = await Wallet.fromMnemonic(seedPhrase, options.path, options.locale)
      this.auth.SET_AUTH(JSON.stringify(wallet.mnemonic), password)
        .then((res) => {
          this.wallet = wallet;
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  async GET_BALANCE_TOPO() {
    const balance = await this.wallet.getBalance();
    console.log('GET_BALANCE_TOPO', balance)
    return balance
  }


  SEND_TRANSACTION (to: string, amount: string, gasLimit: number): Promise<RESPONSE_GLOBAL> {
    return new Promise(async (resolve, reject) => {
      try {
        const tx = {
          from: this.walletMnemonic.address,
          to,
          value: utils.parseEther(amount),
          gasLimit: utils.hexlify(gasLimit)
        }
        if(this.wallet) {
          const data = await this.wallet.sendTransaction(tx)
          resolve({
            message: 'sendTransaction',
            data
          })
        }
        else {
          reject({
            message: `address ${to} is not validate!`,
            data: ''
          })
        } 
      } catch (error) {
        
      }
      
    })
  }

  GET_LIST_CONTRACT (): Promise<RESPONSE_GLOBAL> {
    return new Promise((resolve, reject) => {
      try {
        resolve({
          message: '',
          data: []
        })
      } catch (error) {
        reject({
          message: '',
          data: error
        })
      }
    })
  }
}
