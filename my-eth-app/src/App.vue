<template>
  <div id="app">
    <h1>Aplicación Ethereum</h1>
    <div v-if="!isConnected">
      <button @click="connectWallet">Conectar Billetera</button>
    </div>
    <div v-else>
      <p>Dirección: {{ address }}</p>
      <p>Saldo: {{ balance }} ETH</p>
      <button @click="refreshBalance">Refrescar Saldo</button>
      <br />
      <h2>Enviar ETH</h2>
      <input type="text" v-model="recipient" placeholder="Dirección del destinatario" />
      <input type="number" v-model.number="amount" placeholder="Cantidad ETH" />
      <button @click="sendTransaction">Enviar</button>
      <br />
      <h2>Depositar ETH</h2>
      <p>
        Envía ETH a la dirección:
        <b>{{ address }}</b>
      </p>
      <button @click="showQRCode">Mostrar código QR</button>
      <div v-if="showQR">
        <img :src="qrCode" alt="Código QR" />
      </div>
    </div>
  </div>
</template>

<script>
import { connectToGanache } from './web3';

export default {
  data() {
    return {
      isConnected: false,
      address: '',
      balance: 0,
      recipient: '',
      amount: 0,
      showQR: false,
      qrCode: '',
    };
  },
  mounted() {
    this.connectWallet();
  },
  methods: {
    async connectWallet() {
      try {
        const web3 = await connectToGanache();
        const accounts = await web3.eth.getAccounts();
        this.address = accounts[0];
        this.isConnected = true;
        this.refreshBalance();
      } catch (error) {
        console.error('Error al conectar la billetera:', error);
      }
    },
    async refreshBalance() {
      const web3 = await connectToGanache();
      this.balance = await web3.eth.getBalance(this.address);
      this.balance = web3.utils.fromWei(this.balance, 'ether');
    },
    async sendTransaction() {
      const web3 = await connectToGanache();
      try {
        const txHash = await web3.eth.sendTransaction({
          from: this.address,
          to: this.recipient,
          value: web3.utils.toWei(this.amount.toString(), 'ether'),
        });
        console.log('Transacción enviada:', txHash);
        this.refreshBalance();
        // Mostrar mensaje de éxito
      } catch (error) {
        console.error('Error al enviar la transacción:', error);
        // Mostrar mensaje de error
      }
    },
    showQRCode() {
      this.showQR = true;
      // Genera el código QR utilizando una biblioteca de tu preferencia (ej: qrcode.js)
      // this.qrCode = 'url del código QR generado';
    },
  },
};
</script>