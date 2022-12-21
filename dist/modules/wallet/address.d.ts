import { RESPONSE_CONTACT } from '../../contanst';
export declare class ADDRESS_WALLET {
    address: string;
    constructor(address: string);
    CHECK_ADDRESS(address: string): boolean;
    SET_CONTACT(address: string, name: string): Promise<RESPONSE_CONTACT>;
    GET_LIST_CONTACT(): Promise<RESPONSE_CONTACT>;
}
