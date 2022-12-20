export const LOCAL_STORAGE = {
  TOPOPASS_ACCOUNT_HASH: 'topopass_account_hash',
  CONTACTS: 'contacts',
}

export type RESPONSE_AUTH_WALLET = {
  phrase: string;
  path: string;
  locale: string;
}

export type RESPONSE_GLOBAL = {
  message: string;
  data: any;
}

export type RESPONSE_ACTION_AUTH = {
  message: string;
  data: any;
}

export type CONTACT = {
  address: string;
  name: string;
  avatar: string;
  space: string;
}

export type RESPONSE_CONTACT = {
  message: string;
  data: any;
}

