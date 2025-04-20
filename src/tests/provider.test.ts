import { describe, it, expect } from "vitest";
import { getProvider, CHAIN_ID } from "../core/provider.js";

describe("Provider", () => {
  it("should create an HTTP provider with correct chain ID", async () => {
    const provider = getProvider("http");
    const network = await provider.getNetwork();
    expect(network.chainId).toBe(BigInt(CHAIN_ID));
  });

  it("should create a WebSocket provider with correct chain ID", async () => {
    const provider = getProvider("ws");
    const network = await provider.getNetwork();
    expect(network.chainId).toBe(BigInt(CHAIN_ID));
  });

  it("should get the latest block number", async () => {
    const provider = getProvider();
    const blockNumber = await provider.getBlockNumber();
    expect(typeof blockNumber).toBe("number");
    expect(blockNumber).toBeGreaterThan(0);
  });
}); 