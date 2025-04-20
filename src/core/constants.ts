export const CHAIN_ID = 21363 as const;
export const RPC_URLS = {
  http: "https://service.lestnet.org",
  ws: "wss://service.lestnet.org/ws",
} as const;

export const EXPLORER_URL = "https://explorer.lestnet.org";
export const EVM_FORK = "cancun" as const;

// Network metadata
export const NETWORK_METADATA = {
  chainId: CHAIN_ID,
  name: "Lestnet",
  nativeCurrency: {
    name: "LETH",
    symbol: "LETH",
    decimals: 18,
  },
  rpcUrls: RPC_URLS,
  blockExplorerUrls: [EXPLORER_URL],
  evmFork: EVM_FORK,
} as const; 