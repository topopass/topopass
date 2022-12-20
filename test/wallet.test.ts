import { WALLET_TOPO, NETWORK_TOPO } from '../src/modules';


const GET_BALANCE_TOPO = () => {
  const network = new NETWORK_TOPO('https://data-seed-prebsc-1-s1.binance.org:8545/', 'BNB');
    const wallet = new WALLET_TOPO(network);
    wallet.LOGIN_TOPO('11')
      .then(async () => {
        const balance = await wallet.GET_BALANCE_TOPO()
        console.log('balance', balance)
    })
}

const SEND_TRANSACTION = () => {
  const network = new NETWORK_TOPO('https://data-seed-prebsc-1-s1.binance.org:8545/', 'BNB');
    const wallet = new WALLET_TOPO(network);
    wallet.LOGIN_TOPO('11')
      .then(async () => {
        const balance = await wallet.SEND_TRANSACTION('0x59040C12Ebb3e41e6742D764B0b967A54f61FD87', '0.1', 21000)
        console.log('balance', balance)
    })
}

test('wallet', () => {
  GET_BALANCE_TOPO()
  SEND_TRANSACTION()
});