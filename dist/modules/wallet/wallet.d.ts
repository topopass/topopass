import { NETWORK_TOPO } from "./network";
import { AUTH_TOPO } from "./auth";
import { ADDRESS_WALLET } from "./address";
import { RESPONSE_ACTION_AUTH, RESPONSE_GLOBAL } from '../../contanst';
export declare class WALLET_TOPO {
    network: NETWORK_TOPO;
    auth: AUTH_TOPO;
    address: ADDRESS_WALLET;
    wallet: any;
    walletMnemonic: any;
    password: string;
    constructor(network: NETWORK_TOPO);
    LOGIN_TOPO(password: string): Promise<boolean>;
    CREATE_SEED_PHRASE(options: any): Promise<unknown>;
    IMPORT_SEED_PHRASE(seedPhrase: string, options: any, password: string): Promise<RESPONSE_ACTION_AUTH>;
    GET_BALANCE_TOPO(): Promise<any>;
    SEND_TRANSACTION(to: string, amount: string, gasLimit: number): Promise<RESPONSE_GLOBAL>;
    GET_LIST_CONTRACT(): Promise<RESPONSE_GLOBAL>;
}
