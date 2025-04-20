import { 
  getProvider, 
  createRandom, 
  sendTx, 
  lethToWei, 
  formatLeth 
} from '@lestnet/sdk';

async function main() {
  try {
    // Create a new wallet
    const wallet = createRandom();
    console.log('New wallet created:', {
      address: wallet.address,
      privateKey: wallet.privateKey
    });

    // Connect to network
    const provider = getProvider();
    const network = await provider.getNetwork();
    console.log('Connected to network:', {
      chainId: network.chainId.toString(),
      blockNumber: await provider.getBlockNumber()
    });

    // Check balance
    const balance = await provider.getBalance(wallet.address);
    console.log('Wallet balance:', formatLeth(balance));

    // Example transaction (uncomment to use)
    /*
    const tx = await sendTx({
      to: "RECEIVER_ADDRESS",
      value: lethToWei("0.1"),
      privateKey: wallet.privateKey
    });
    console.log('Transaction sent:', tx.hash);
    */

  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 