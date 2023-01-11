import { RESPONSE_AUTH_WALLET, RESPONSE_ACTION_AUTH, RESPONSE_GLOBAL } from '../../contanst';
export declare class AUTH_TOPO {
    hash: string;
    password: string;
    constructor(hash: string);
    CHECK_AUTH(account: string, password: string): Promise<RESPONSE_AUTH_WALLET>;
    SET_AUTH(mnemonic: string, password: string): Promise<RESPONSE_ACTION_AUTH>;
    SIGNUP(seedPhrase: string, password: string): Promise<RESPONSE_GLOBAL>;
}
