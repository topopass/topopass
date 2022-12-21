import { JsonRpcProvider } from "@ethersproject/providers";
export declare class NETWORK_TOPO {
    network: string;
    name: string;
    rpc: JsonRpcProvider;
    provider: any;
    constructor(network: string, name: string);
}
