import {
  LOCAL_STORAGE,
  RESPONSE_AUTH_WALLET,
  RESPONSE_ACTION_AUTH
} from '../../contanst'
import CryptoJS from 'crypto-js'

export class AUTH_TOPO {
  hash: string;

  constructor (hash: string) {
    this.hash = hash
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
}