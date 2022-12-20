import { utils } from 'ethers'
import { CONTACT, LOCAL_STORAGE, RESPONSE_CONTACT } from '../../contanst'

export class ADDRESS_WALLET {
  address: string;

  constructor (address: string) {
    this.address = address
  }

  CHECK_ADDRESS (address: string): boolean {
    return utils.isAddress(address)
  }

  SET_CONTACT (address: string, name: string): Promise<RESPONSE_CONTACT> {
    return new Promise((resolve, reject) => {
      if (this.CHECK_ADDRESS(address)) {
        let contacts : CONTACT[] | undefined;
        if (localStorage.getItem(LOCAL_STORAGE.CONTACTS)) contacts = JSON.parse(localStorage.getItem('contacts') || '[]')

        if (contacts !== undefined) contacts.push({address, name, space: '', avatar: ''})
        else contacts = [{address, name, space: '', avatar: ''}]

        resolve({
          message: 'Save contact success',
          data: {address, name, space: '', avatar: ''}
        })
      } else {
        reject({
          message: 'Address not is validate!!',
          data: ''
        })
      }
    })
  }

  GET_LIST_CONTACT (): Promise<RESPONSE_CONTACT> {
    return new Promise((resolve, reject) => {
      try {
        let contacts: CONTACT[] | undefined;
      
        if(localStorage.getItem(LOCAL_STORAGE.CONTACTS)) contacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE.CONTACTS) || '[]')

        resolve({
          message: 'Get list contact',
          data: contacts
        })
      } catch (error) {
        reject({
          message: 'GET failed list contact',
          data: error
        })
      }
    })
  }
}
