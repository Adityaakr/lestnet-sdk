import { describe, it, expect } from "vitest";
import { lethToWei, weiToLeth, formatLeth } from "../helpers/units";

describe("Unit Conversions", () => {
  it("should convert LETH to wei", () => {
    const wei = lethToWei("1.5");
    expect(wei.toString()).toBe("1500000000000000000");
  });

  it("should convert wei to LETH", () => {
    const leth = weiToLeth("1500000000000000000");
    expect(leth).toBe("1.5");
  });

  it("should format LETH with symbol", () => {
    const formatted = formatLeth("1500000000000000000");
    expect(formatted).toBe("1.5 LETH");
  });
}); 