import { describe, expect, it } from "vitest";
import { formatUsd, maskEmail } from "./utils";

describe("formatUsd", () => {
  it("formats prices as USD with two decimals", () => {
    expect(formatUsd(14.99)).toBe("$14.99");
    expect(formatUsd(6.99)).toBe("$6.99");
    expect(formatUsd(0)).toBe("$0.00");
  });
});

describe("maskEmail", () => {
  it("keeps the first local character and the domain", () => {
    expect(maskEmail("alex@example.com")).toBe("a***@example.com");
    expect(maskEmail("ab@example.com")).toBe("a*@example.com");
  });

  it("does not leak malformed input", () => {
    expect(maskEmail("not-an-email")).toBe("[redacted]");
    expect(maskEmail("@example.com")).toBe("[redacted]");
    expect(maskEmail("alex@")).toBe("[redacted]");
  });
});
