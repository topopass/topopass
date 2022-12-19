import {
  LOCAL_STORAGE
} from '../../contanst'
import CryptoJS from 'crypto-js'

export class AUTH_TOPO {
  hash: string;

  constructor (hash: string) {
    this.hash = hash
  }

  CHECK_AUTH (password: string) {
    return new Promise((resolve, reject) => {
      try {
        let ciphertext = localStorage.getItem(LOCAL_STORAGE.TOPOPASS_ACCOUNT_HASH) || ''
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
}