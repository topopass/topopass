import { JsonRpcProvider } from "@ethersproject/providers"
import { ethers } from 'ethers'

export class NETWORK_TOPO {
  network: string;
  name: string;
  rpc: JsonRpcProvider;
  provider: any;


  constructor (network: string, name: string) {
    this.network = network;
    this.name = name;
    this.rpc = new JsonRpcProvider(network)
    this.provider = new ethers.providers.JsonRpcProvider(network)
  }
}
