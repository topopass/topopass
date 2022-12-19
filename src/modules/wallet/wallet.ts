import { NETWORK_TOPO } from "./network";
import { randomBytes } from "@ethersproject/random";
import { entropyToMnemonic } from "@ethersproject/hdnode";
import { AUTH_TOPO } from "./auth";

export class WALLET_TOPO {
  network: NETWORK_TOPO;
  auth: AUTH_TOPO

  constructor (network: NETWORK_TOPO) {
    this.network = network
    this.auth = new AUTH_TOPO('')
  }

  CREATE_SEED_PHRASE (options: any) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!options) { options = { }; }
        const entropy = randomBytes(16)
        const mnemonic = await entropyToMnemonic(entropy, options.locale);

        if (mnemonic) resolve(mnemonic)
        else reject(mnemonic)
      } catch (error) {
        reject(error)
      }
    })
  }

  LOGIN_TOPO (password: string) {
    return new Promise(async (resolve, reject) => {
      if (this.auth) {
        await this.auth.CHECK_AUTH(password)
        .then((res) => {
          resolve(res)
        }).
        catch((err) => {
          reject(err)
        })
      }
      reject('error auth!')
    })
  }
}
