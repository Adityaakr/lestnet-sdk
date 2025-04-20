import { getProvider, sendTx, lethToWei, createRandom } from '../dist/index.js';

async function main() {
  try {
    // Create a new wallet
    const wallet = createRandom();
    console.log('New wallet address:', wallet.address);
    
    // Connect to Lestnet
    const provider = getProvider();
    const network = await provider.getNetwork();
    console.log('Connected to network:', {
      chainId: network.chainId.toString(),
      blockNumber: await provider.getBlockNumber()
    });
    
    // Send a transaction (this is just an example, needs actual private key)
    const tx = await sendTx({
      to: "0x1234567890123456789012345678901234567890",
      value: lethToWei("0.1"),
      privateKey: wallet.privateKey
    });
    
    console.log('Transaction sent:', tx.hash);
  } catch (error) {
    console.error('Error:', error);
  }
} 