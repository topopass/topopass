const { WALLET_TOPO, NETWORK_TOPO } = require('./src/modules');


const LOGIN_TOPO = () => {
  const network = new NETWORK_TOPO('https://data-seed-prebsc-1-s1.binance.org:8545/', 'BNB');
    const wallet = new WALLET_TOPO(network);
    wallet.LOGIN_TOPO('11')
      .then(async (LOGIN_TOPO) => {
        console.log('LOGIN_TOPO', LOGIN_TOPO)
    })
    .catch((err) => {
      console.log('LOGIN_TOPO', err)
    })
}

// const SEND_TRANSACTION = () => {
//   const network = new NETWORK_TOPO('https://data-seed-prebsc-1-s1.binance.org:8545/', 'BNB');
//     const wallet = new WALLET_TOPO(network);
//     wallet.LOGIN_TOPO('11')
//       .then(async () => {
//         const balance = await wallet.SEND_TRANSACTION('0x59040C12Ebb3e41e6742D764B0b967A54f61FD87', '0.1', 21000)
//         console.log('balance', balance)
//     })
// }

LOGIN_TOPO();

// test('wallet', () => {
//   LOGIN_TOPO()
//   SEND_TRANSACTION()
// });