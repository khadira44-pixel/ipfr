import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { rateLimit, resetRateLimitStore } from "./rate-limit";

describe("rateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
    resetRateLimitStore();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows requests up to the limit and blocks the next one", () => {
    const options = { key: "checkout:1.2.3.4", limit: 2, windowMs: 60_000 };

    expect(rateLimit(options).allowed).toBe(true);
    expect(rateLimit(options).allowed).toBe(true);

    const blocked = rateLimit(options);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBe(60);
  });

  it("resets after the window elapses", () => {
    const options = { key: "checkout:5.6.7.8", limit: 1, windowMs: 60_000 };

    expect(rateLimit(options).allowed).toBe(true);
    expect(rateLimit(options).allowed).toBe(false);

    vi.advanceTimersByTime(60_001);
    expect(rateLimit(options).allowed).toBe(true);
  });

  it("tracks separate keys independently", () => {
    expect(rateLimit({ key: "a", limit: 1, windowMs: 60_000 }).allowed).toBe(true);
    expect(rateLimit({ key: "a", limit: 1, windowMs: 60_000 }).allowed).toBe(false);
    expect(rateLimit({ key: "b", limit: 1, windowMs: 60_000 }).allowed).toBe(true);
  });
});
