import { 
  getProvider, 
  sendTx, 
  lethToWei, 
  weiToLeth, 
  formatLeth,
  createRandom,
  createFromMnemonic,
  topUpFromFaucet
} from '../dist/index.js';

async function main() {
  try {
    // 1. Create a new wallet
    const wallet = createRandom();
    console.log('1. Created new wallet:', {
      address: wallet.address,
      mnemonic: wallet.mnemonic.phrase
    });

    // 2. Connect to Lestnet
    const provider = getProvider();
    const network = await provider.getNetwork();
    console.log('\n2. Connected to Lestnet:', {
      chainId: network.chainId.toString(),
      blockNumber: await provider.getBlockNumber()
    });

    // 3. Request test LETH from faucet
    console.log('\n3. Requesting test LETH from faucet...');
    const faucetTx = await topUpFromFaucet(wallet.address);
    console.log('Faucet transaction hash:', faucetTx);

    // 4. Check balance
    const balance = await provider.getBalance(wallet.address);
    console.log('\n4. Wallet balance:', formatLeth(balance));

    // 5. Create another wallet from mnemonic
    const wallet2 = createFromMnemonic(wallet.mnemonic.phrase);
    console.log('\n5. Recovered wallet from mnemonic:', {
      address: wallet2.address,
      matchesOriginal: wallet2.address === wallet.address
    });

    // 6. Send a transaction
    console.log('\n6. Sending transaction...');
    const tx = await sendTx({
      to: "0x1234567890123456789012345678901234567890", // Example address
      value: lethToWei("0.1"),
      privateKey: wallet.privateKey
    });
    console.log('Transaction sent:', {
      hash: tx.hash,
      amount: weiToLeth(tx.value)
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 