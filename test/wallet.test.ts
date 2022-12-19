import { WALLET_TOPO, NETWORK_TOPO } from '../src/modules';

const network = new NETWORK_TOPO('https://data-seed-prebsc-1-s1.binance.org:8545/', 'BNB');
const wallet = new WALLET_TOPO(network);

const test = () => {
  wallet.LOGIN_TOPO('11')
    .then((res) => {
      console.log('res', res)
    })
    .catch((err) => {
      console.log('err', err)
    })
}

test()