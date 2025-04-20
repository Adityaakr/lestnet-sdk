# STXN SDK

A TypeScript/JavaScript SDK for interacting with the Lestnet blockchain (Chain ID: 21363). Built with ethers.js v6, this SDK provides a simple and intuitive interface for blockchain interactions.

## Why Use This SDK?

### Without SDK (Raw Implementation)
```typescript
import { ethers } from 'ethers';

// 1. Connect to Lestnet
const provider = new ethers.JsonRpcProvider("https://service.lestnet.org");
await provider.getNetwork().then(network => {
  if (network.chainId !== 21363n) {
    throw new Error("Wrong network");
  }
});

// 2. Create wallet
const wallet = ethers.Wallet.createRandom().connect(provider);
console.log('Address:', wallet.address);

// 3. Send transaction
const tx = await wallet.sendTransaction({
  to: "0x...",
  value: ethers.parseEther("0.1"),
  maxFeePerGas: await provider.getFeeData().then(f => f.maxFeePerGas),
  maxPriorityFeePerGas: await provider.getFeeData().then(f => f.maxPriorityFeePerGas),
});

// 4. Handle errors and retries manually
let attempts = 0;
const maxAttempts = 3;
while (attempts < maxAttempts) {
  try {
    await tx.wait();
    break;
  } catch (e) {
    attempts++;
    await new Promise(r => setTimeout(r, 1000 * attempts));
  }
}
```

### With SDK (Simple & Clean)
```typescript
import { lestnet, createRandom, sendTx, lethToWei } from 'stxn-sdk';

// 1. Connect to Lestnet
const provider = lestnet();

// 2. Create wallet
const wallet = createRandom();
console.log('Address:', wallet.address);

// 3. Send transaction (with automatic retries)
const tx = await sendTx({
  to: "0x...",
  value: lethToWei("0.1"),
  privateKey: wallet.privateKey
});
```

## Features

- 🔌 **Pre-configured Providers** - Connect to Lestnet with one line of code
- 💳 **Wallet Management** - Create, recover, and manage wallets easily
- 📦 **Transaction Handling** - Send transactions with built-in Cancun fork support
- 💧 **Faucet Integration** - Request test LETH directly through the SDK
- 🔄 **Unit Conversions** - Easy conversion between LETH and Wei
- 🔁 **Retry Logic** - Built-in exponential backoff for API calls
- 📝 **TypeScript Support** - Full type definitions included

## Quick Start

```bash
# Install the SDK
npm install stxn-sdk ethers
```

```typescript
import { 
  lestnet, 
  createRandom, 
  sendTx, 
  lethToWei,
  topUpFromFaucet 
} from 'stxn-sdk';

async function main() {
  // Connect to network
  const provider = lestnet();
  console.log('Chain ID:', (await provider.getNetwork()).chainId.toString());

  // Create wallet
  const wallet = createRandom();
  console.log('New wallet:', wallet.address);

  // Get test tokens
  const faucetTx = await topUpFromFaucet(wallet.address);
  console.log('Faucet TX:', faucetTx);

  // Send transaction
  const tx = await sendTx({
    to: "0x...",
    value: lethToWei("0.1"),
    privateKey: wallet.privateKey
  });
  console.log('Transaction hash:', tx.hash);
}

main();
```

## Common Use Cases

### 1. Wallet Management
```typescript
import { createRandom, createFromMnemonic } from 'stxn-sdk';

// Create new wallet
const wallet = createRandom();
console.log({
  address: wallet.address,
  privateKey: wallet.privateKey,
  mnemonic: wallet.mnemonic.phrase
});

// Recover wallet
const recoveredWallet = createFromMnemonic('your twelve word mnemonic phrase here');
```

### 2. Transaction Handling
```typescript
import { sendTx, lethToWei } from 'stxn-sdk';

// Simple transfer
const tx = await sendTx({
  to: receiverAddress,
  value: lethToWei("0.1"),
  privateKey: senderPrivateKey
});

// With blob data (EIP-4844)
const blobTx = await sendTx({
  to: receiverAddress,
  value: lethToWei("0.1"),
  privateKey: senderPrivateKey,
  blobVersionedHashes: [...] // Blob hashes
});
```

### 3. Balance & Units
```typescript
import { lestnet, weiToLeth, formatLeth } from 'stxn-sdk';

const provider = lestnet();

// Get balance
const balance = await provider.getBalance(address);

// Convert to LETH
console.log('Balance:', weiToLeth(balance)); // "1.5"

// Format with symbol
console.log('Balance:', formatLeth(balance)); // "1.5 LETH"
```

### 4. Error Handling
```typescript
import { withRetry } from 'stxn-sdk';

const result = await withRetry(
  async () => {
    // Your API call here
    return await provider.getBalance(address);
  },
  {
    maxAttempts: 3,
    initialDelay: 1000
  }
);
```

## Network Information

- **Chain ID**: 21363
- **Network Name**: Lestnet
- **RPC Endpoints**:
  - HTTP: https://service.lestnet.org
  - WebSocket: wss://service.lestnet.org/ws
- **Block Explorer**: https://explorer.lestnet.org
- **EVM Fork**: Cancun

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint
npm run lint
```

## Examples

Check the [examples](./examples) directory for more detailed examples:
- [Basic Usage](./examples/basic-usage.js) - Simple provider and transaction examples
- [Complete Demo](./examples/demo.js) - Comprehensive SDK feature demonstration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

For support, please open an issue in the GitHub repository.
