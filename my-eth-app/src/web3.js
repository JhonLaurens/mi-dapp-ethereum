import Web3 from 'web3';

let web3;

const connectToGanache = async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' }); // Conexión a MetaMask
  } else if (window.web3) {
    web3 = new Web3(window.web3.currentProvider);
  } else {
    web3 = new Web3('http://127.0.0.1:7545'); // URL del servidor RPC de Ganache
  }
  return web3;
};

export { connectToGanache };