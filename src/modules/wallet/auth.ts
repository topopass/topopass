import {
  LOCAL_STORAGE,
  RESPONSE_AUTH_WALLET,
  RESPONSE_ACTION_AUTH,
  RESPONSE_GLOBAL
} from '../../contanst'
import CryptoJS from 'crypto-js'
import { Wallet } from 'ethers'

export class AUTH_TOPO {
  
  hash: string;
  password: string;

  constructor (hash: string) {
    this.hash = hash
    this.password = ''
  }

  CHECK_AUTH (account: string, password: string): Promise<RESPONSE_AUTH_WALLET> {
    return new Promise((resolve, reject) => {
      try {
        let ciphertext = account
        let decryptData = CryptoJS.AES.decrypt(
          ciphertext,
          password
        ).toString(CryptoJS.enc.Utf8);

        if (decryptData) {
          const result = typeof decryptData === 'string' ? JSON.parse(decryptData) : decryptData
          this.password = password
          resolve(result)
        } else reject({
          phrase: null,
          path: "",
          locale: "en"
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  SET_AUTH (mnemonic: string, password: string): Promise<RESPONSE_ACTION_AUTH> {
    return new Promise((resolve, reject) => {
      try {
        var ciphertext = CryptoJS.AES.encrypt(mnemonic, password).toString();
        localStorage.setItem(LOCAL_STORAGE.TOPOPASS_ACCOUNT_HASH, ciphertext)
        this.hash = ciphertext
        resolve({
          message: 'Create auth success!',
          data: ciphertext,
        })
      } catch (error) {
        reject({
          message: 'Failed create auth!',
          data: error,
        })
      }
    })
  }

  SIGNUP (seedPhrase: string, password: string): Promise<RESPONSE_GLOBAL> {
    return new Promise(async (resolve, reject) => {
      try {
        const wallet = await Wallet.fromMnemonic(seedPhrase)
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(wallet.mnemonic), password).toString();
        localStorage.setItem(LOCAL_STORAGE.TOPOPASS_ACCOUNT_HASH, ciphertext)
        resolve({
          message: 'SignUp success',
          data: ciphertext
        })
      } catch (error) {
        reject({
          message: 'SignUp failed',
          data: null
        })
      }
    })
  }
}
