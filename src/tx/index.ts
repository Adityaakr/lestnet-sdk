import { Wallet, TransactionRequest } from "ethers";
import { getProvider } from "../core/provider.js";

export interface SendTxOptions extends TransactionRequest {
  privateKey: string;
}

export async function sendTx(options: SendTxOptions) {
  const provider = getProvider();
  const wallet = new Wallet(options.privateKey, provider);

  // Handle blob transaction defaults for Cancun
  if ("blobVersionedHashes" in options && !options.maxFeePerBlobGas) {
    options.maxFeePerBlobGas = await provider.send("eth_maxPriorityFeePerGas", []);
  }

  const tx = await wallet.sendTransaction(options);
  return tx.wait(); // Returns the transaction receipt
}

export async function bundleAndSend(blobTxs: TransactionRequest[], privateKey: string) {
  const provider = getProvider();
  const wallet = new Wallet(privateKey, provider);

  const txs = await Promise.all(
    blobTxs.map(async (tx) => {
      if (!tx.maxFeePerBlobGas) {
        tx.maxFeePerBlobGas = await provider.send("eth_maxPriorityFeePerGas", []);
      }
      return tx;
    })
  );

  const receipts = await Promise.all(
    txs.map((tx) => wallet.sendTransaction(tx).then((tx) => tx.wait()))
  );

  return receipts;
} 