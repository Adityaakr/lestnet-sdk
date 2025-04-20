# Lestnet SDK

A TypeScript SDK for interacting with the Lestnet blockchain (Chain ID 21363).

## Installation

```bash
npm install lestnet-sdk
```

## Quick Start

```typescript
import { getProvider, sendTx, lethToWei } from "lestnet-sdk";

async function main() {
  // Get a provider
  const provider = getProvider();
  
  // Get the latest block number
  const blockNumber = await provider.getBlockNumber();
  console.log("Latest block:", blockNumber);
  
  // Send a transaction
  const tx = await sendTx({
    to: "0x...",
    value: lethToWei("0.1"),
    privateKey: "0x...",
  });
  
  console.log("Transaction hash:", tx.hash);
}

main();
```

## Features

- Pre-configured providers (HTTP and WebSocket)
- Transaction handling with Cancun fork support
- HD wallet utilities
- Unit conversion helpers
- Retry logic with exponential backoff
- TypeScript support

## API Reference

### Core

- `getProvider(kind?: "http" | "ws")` - Get a pre-configured provider
- `CHAIN_ID` - Lestnet chain ID (21363)
- `RPC_URLS` - RPC endpoint URLs
- `EXPLORER_URL` - Block explorer URL
- `EVM_FORK` - Current EVM fork name

### Wallet

- `createFromMnemonic(mnemonic: string)` - Create wallet from mnemonic
- `createRandom()` - Create a random wallet
- `topUpFromFaucet(address: string)` - Request test LETH from faucet
- `getWallet(options: WalletOptions)` - Get wallet instance

### Transaction

- `sendTx(options: SendTxOptions)` - Send a transaction
- `bundleAndSend(blobTxs: TransactionRequest[], privateKey: string)` - Send multiple blob transactions

### Helpers

- `lethToWei(amount: string | number)` - Convert LETH to wei
- `weiToLeth(amount: bigint | string)` - Convert wei to LETH
- `formatUSD(amount: number)` - Format number as USD
- `formatLeth(amount: bigint | string)` - Format wei as LETH

## Development

```bash
# Install dependencies
npm install

# Build the SDK
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint
```

## License

ISC 