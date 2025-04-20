import { Wallet, HDNodeWallet } from "ethers";
import { lestnet } from "../core/provider.js";
import { withRetry } from "../utils/retry.js";

export interface WalletOptions {
  mnemonic?: string;
  privateKey?: string;
}

export function createFromMnemonic(mnemonic: string): HDNodeWallet {
  return HDNodeWallet.fromPhrase(mnemonic);
}

export function createRandom(): HDNodeWallet {
  return Wallet.createRandom();
}

export async function topUpFromFaucet(address: string): Promise<string> {
  const provider = lestnet();
  
  return withRetry(async () => {
    const response = await fetch("https://faucet.lestnet.org/api/v1/faucet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      throw new Error(`Faucet request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.txHash;
  });
}

export function getWallet(options: WalletOptions): Wallet {
  if (options.privateKey) {
    return new Wallet(options.privateKey, lestnet());
  }
  
  if (options.mnemonic) {
    const hdNode = createFromMnemonic(options.mnemonic);
    return new Wallet(hdNode.privateKey, lestnet());
  }

  throw new Error("Either mnemonic or privateKey must be provided");
} 