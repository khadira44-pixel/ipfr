import { describe, expect, it } from "vitest";
import { checkoutSchema } from "./schema";

const validInput = {
  fullName: "Alex Morgan",
  email: "alex@example.com",
  planId: "vip-12m",
  consent: true,
};

describe("checkoutSchema", () => {
  it("accepts a valid submission", () => {
    const result = checkoutSchema.safeParse(validInput);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.planId).toBe("vip-12m");
      expect(result.data.fullName).toBe("Alex Morgan");
    }
  });

  it("trims surrounding whitespace from names", () => {
    const result = checkoutSchema.safeParse({ ...validInput, fullName: "  Alex Morgan  " });

    expect(result.success).toBe(true);
    if (result.success) expect(result.data.fullName).toBe("Alex Morgan");
  });

  it("rejects malformed email addresses", () => {
    const result = checkoutSchema.safeParse({ ...validInput, email: "not-an-email" });

    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.email?.[0]).toMatch(/valid email/i);
    }
  });

  it("requires explicit consent", () => {
    const result = checkoutSchema.safeParse({ ...validInput, consent: false });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.consent?.[0]).toMatch(/accept/i);
    }
  });

  it("rejects plans that are not in the catalog", () => {
    const result = checkoutSchema.safeParse({ ...validInput, planId: "free-lifetime" });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.planId?.[0]).toBeDefined();
    }
  });

  it("rejects overly long names", () => {
    const result = checkoutSchema.safeParse({ ...validInput, fullName: "a".repeat(81) });

    expect(result.success).toBe(false);
  });

  it("lets the service inspect a filled honeypot", () => {
    const result = checkoutSchema.safeParse({ ...validInput, website: "https://spam.example" });

    expect(result.success).toBe(true);
    if (result.success) expect(result.data.website).toBe("https://spam.example");
  });
});
