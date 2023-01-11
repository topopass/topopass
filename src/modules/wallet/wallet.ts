import { NETWORK_TOPO } from "./network";
import { randomBytes } from "@ethersproject/random";
import { entropyToMnemonic } from "@ethersproject/hdnode";
import { AUTH_TOPO } from "./auth"; 
import { ADDRESS_WALLET } from "./address";
import {
  utils,
  Wallet,
  Contract
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

  LOGIN_TOPO (account: string, password: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      await this.auth.CHECK_AUTH(account, password)
      .then(async (res) => {
        this.walletMnemonic = await Wallet.fromMnemonic(res.phrase, res.path)
        this.wallet = this.walletMnemonic.connect(this.network.rpc)
        this.password = password
        resolve(true)
      })
      .catch(() => {
        reject(false)
      })
    })
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

  async GET_BALANCE_TOPO(address: string) {
    if(!address) {
      const balance = await this.wallet.getBalance();
      return balance
    } else {
      const contract = await this.GET_CONTRACT(address)
      return contract.balanceOf(address)
    }
  }

  GET_CONTRACT (address: string) {
    // The ERC-20 Contract ABI, which is a common contract interface
    // for tokens (this is the Human-Readable ABI format)
    const daiAbi = [
      // Some details about the token
      "function name() view returns (string)",
      "function symbol() view returns (string)",

      // Get the account balance
      "function balanceOf(address) view returns (uint)",

      // Send some of your tokens to someone else
      "function transfer(address to, uint amount)",

      // An event triggered whenever anyone transfers to someone else
      "event Transfer(address indexed from, address indexed to, uint amount)"
    ];

    // The Contract object
    const contract = new Contract(address, daiAbi, this.network.provider);
    return contract
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
            data: data
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

  // GET_TRANSACTIONS (): Promise<RESPONSE_GLOBAL> {
  //   // return new Promise((resolve, reject) => {
      
  //   // })
  // }

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
