import { beforeEach, describe, expect, it, vi } from "vitest";
import { initialCheckoutState } from "@/lib/checkout/types";
import { resetRateLimitStore } from "@/lib/rate-limit";

const mocks = vi.hoisted(() => ({
  headers: vi.fn(),
  submitLead: vi.fn(),
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("next/headers", () => ({ headers: mocks.headers }));
vi.mock("@/lib/checkout/service", () => ({ submitLead: mocks.submitLead }));
vi.mock("@/lib/logger", () => ({
  logger: mocks.logger,
  serializeError: (error: unknown) => ({ message: String(error) }),
}));

import { submitCheckoutAction } from "./checkout";

function buildFormData(overrides: Record<string, string> = {}): FormData {
  const data = new FormData();
  data.set("fullName", "Alex Morgan");
  data.set("email", "alex@example.com");
  data.set("planId", "vip-12m");
  data.set("consent", "on");

  for (const [key, value] of Object.entries(overrides)) {
    data.set(key, value);
  }

  return data;
}

describe("submitCheckoutAction", () => {
  beforeEach(() => {
    resetRateLimitStore();
    vi.clearAllMocks();
    mocks.headers.mockResolvedValue(new Headers({ "x-forwarded-for": "203.0.113.10" }));
    mocks.submitLead.mockResolvedValue({ reference: "SV-2026-ABC123" });
  });

  it("returns a success state for a valid submission", async () => {
    const state = await submitCheckoutAction(initialCheckoutState, buildFormData());

    expect(state.status).toBe("success");
    expect(state.reference).toBe("SV-2026-ABC123");
    expect(mocks.submitLead).toHaveBeenCalledWith(
      {
        fullName: "Alex Morgan",
        email: "alex@example.com",
        planId: "vip-12m",
      },
      { ip: "203.0.113.10" },
    );
  });

  it("returns field errors without calling the lead service", async () => {
    const state = await submitCheckoutAction(
      initialCheckoutState,
      buildFormData({ email: "bad-email" }),
    );

    expect(state.status).toBe("error");
    expect(state.fieldErrors?.email).toMatch(/valid email/i);
    expect(mocks.submitLead).not.toHaveBeenCalled();
  });

  it("fails closed when consent is missing", async () => {
    const data = buildFormData();
    data.delete("consent");

    const state = await submitCheckoutAction(initialCheckoutState, data);

    expect(state.status).toBe("error");
    expect(state.fieldErrors?.consent).toMatch(/accept/i);
    expect(mocks.submitLead).not.toHaveBeenCalled();
  });

  it("silently accepts honeypot submissions without creating a lead", async () => {
    const state = await submitCheckoutAction(
      initialCheckoutState,
      buildFormData({ website: "https://spam.example" }),
    );

    expect(state.status).toBe("success");
    expect(state.reference).toBe("SV-RECEIVED");
    expect(mocks.submitLead).not.toHaveBeenCalled();
    expect(mocks.logger.warn).toHaveBeenCalledWith("checkout.honeypot_triggered");
  });

  it("rate limits repeated submissions from one IP", async () => {
    for (let attempt = 0; attempt < 10; attempt += 1) {
      const state = await submitCheckoutAction(initialCheckoutState, buildFormData());
      expect(state.status).toBe("success");
    }

    const blocked = await submitCheckoutAction(initialCheckoutState, buildFormData());

    expect(blocked.status).toBe("error");
    expect(blocked.message).toMatch(/too many attempts/i);
    expect(mocks.submitLead).toHaveBeenCalledTimes(10);
  });

  it("returns a safe message when lead delivery fails", async () => {
    mocks.submitLead.mockRejectedValueOnce(new Error("CRM down"));

    const state = await submitCheckoutAction(initialCheckoutState, buildFormData());

    expect(state.status).toBe("error");
    expect(state.message).toMatch(/couldn't submit/i);
    expect(mocks.logger.error).toHaveBeenCalledWith(
      "checkout.submission_failed",
      expect.any(Object),
    );
  });
});
