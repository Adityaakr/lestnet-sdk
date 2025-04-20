import { formatUnits, parseUnits } from "ethers";

export function lethToWei(amount: string | number): bigint {
  return parseUnits(amount.toString(), 18);
}

export function weiToLeth(amount: bigint | string): string {
  return formatUnits(amount, 18);
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatLeth(amount: bigint | string): string {
  const eth = weiToLeth(amount);
  return `${eth} LETH`;
} 