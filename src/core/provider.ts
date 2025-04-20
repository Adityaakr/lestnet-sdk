import { JsonRpcProvider, WebSocketProvider } from "ethers";

export const RPC_HTTP = "https://service.lestnet.org";
export const RPC_WS = "wss://service.lestnet.org/ws";
export const CHAIN_ID = 21363 as const;

export const getProvider = (kind: "http" | "ws" = "http") =>
  kind === "http"
    ? new JsonRpcProvider(RPC_HTTP, CHAIN_ID)
    : new WebSocketProvider(RPC_WS, CHAIN_ID); 