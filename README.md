# Lestnet SDK

A TypeScript/JavaScript SDK for interacting with the Lestnet blockchain (Chain ID: 21363). Built with ethers.js v6, this SDK simplifies blockchain interactions with pre-configured network settings and developer-friendly utilities.

## Features

- 🔌 **Pre-configured Providers** - Connect to Lestnet with one line of code
- 💳 **Wallet Management** - Create, recover, and manage wallets easily
- 📦 **Transaction Handling** - Send transactions with built-in Cancun fork support
- 💧 **Faucet Integration** - Request test LETH directly through the SDK
- 🔄 **Unit Conversions** - Easy conversion between LETH and Wei
- 🔁 **Retry Logic** - Built-in exponential backoff for API calls
- 📝 **TypeScript Support** - Full type definitions included

## Installation & Setup

### Prerequisites
- Node.js v16 or higher
- npm v7 or higher

### 1. Create a New Project
```bash
# Create a new directory
mkdir my-lestnet-app
cd my-lestnet-app

# Initialize a new npm project
npm init -y

# If using TypeScript (recommended)
npm install typescript @types/node --save-dev
npx tsc --init
```

### 2. Install the SDK
```bash
# Install the SDK and its peer dependencies
npm install @lestnet/sdk ethers
```

### 3. Basic Setup

#### JavaScript (CommonJS)
```javascript
// index.js
const { getProvider, createRandom } = require('@lestnet/sdk');

async function main() {
  const provider = getProvider();
  const blockNumber = await provider.getBlockNumber();
  console.log('Current block:', blockNumber);
}

main();
```

#### JavaScript (ESM)
```javascript
// index.js
import { getProvider, createRandom } from '@lestnet/sdk';

async function main() {
  const provider = getProvider();
  const blockNumber = await provider.getBlockNumber();
  console.log('Current block:', blockNumber);
}

main();
```

#### TypeScript
```typescript
// index.ts
import { getProvider, createRandom, SendTxOptions } from '@lestnet/sdk';

async function main() {
  const provider = getProvider();
  const blockNumber = await provider.getBlockNumber();
  console.log('Current block:', blockNumber);
}

main();
```

### 4. Configuration (Optional)
Create a `.env` file in your project root:
```env
PRIVATE_KEY=your_private_key_here
LESTNET_RPC_URL=https://service.lestnet.org
```

### 5. Run Your App
```bash
# For JavaScript
node index.js

# For TypeScript
npx ts-node index.ts
```

### Troubleshooting

1. **Module not found errors**
```bash
# Check if package.json has "type": "module"
# If using ESM imports
```

2. **TypeScript import errors**
```bash
# Add to tsconfig.json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

3. **Network Connection Issues**
```javascript
// Test network connection
import { getProvider } from '@lestnet/sdk';

async function testConnection() {
  try {
    const provider = getProvider();
    const network = await provider.getNetwork();
    console.log('Connected to:', network.chainId.toString());
  } catch (error) {
    console.error('Connection failed:', error);
  }
}
```

## API Reference

### Network Connection

```javascript
import { getProvider } from '@lestnet/sdk';

// HTTP Provider
const provider = getProvider();  // default
const httpProvider = getProvider('http');

// WebSocket Provider
const wsProvider = getProvider('ws');
```

### Wallet Management

```javascript
import { createRandom, createFromMnemonic } from '@lestnet/sdk';

// Create new wallet
const wallet = createRandom();
console.log({
  address: wallet.address,
  privateKey: wallet.privateKey,
  mnemonic: wallet.mnemonic.phrase
});

// Recover from mnemonic
const recoveredWallet = createFromMnemonic('your twelve word mnemonic phrase here');
```

### Transactions

```javascript
import { sendTx, lethToWei } from '@lestnet/sdk';

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
  // maxFeePerBlobGas handled automatically
});
```

### Unit Conversions

```javascript
import { lethToWei, weiToLeth, formatLeth } from '@lestnet/sdk';

// Convert to Wei for transactions
const weiAmount = lethToWei("1.5");  // 1500000000000000000n

// Convert from Wei for display
const lethAmount = weiToLeth("1500000000000000000");  // "1.5"

// Format with symbol
const formatted = formatLeth("1500000000000000000");  // "1.5 LETH"
```

### Error Handling

```javascript
import { withRetry } from '@lestnet/sdk';

// Automatic retry with exponential backoff
const result = await withRetry(
  async () => {
    // Your API call here
    return await provider.getBalance(address);
  },
  {
    maxAttempts: 3,
    initialDelay: 1000,  // 1 second
    maxDelay: 10000      // 10 seconds
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

For support, please open an issue in the GitHub repository or reach out to the Lestnet team.
