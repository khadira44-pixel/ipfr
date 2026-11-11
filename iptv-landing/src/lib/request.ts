/**
 * Resolve the caller's IP address from proxy headers.
 *
 * Only trust these headers when the app is deployed behind a proxy that
 * overwrites them (Vercel, Cloudflare, an ingress controller). Exposed
 * directly to the internet, `x-forwarded-for` is attacker-controlled.
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  const firstForwarded = forwardedFor?.split(",")[0]?.trim();
  if (firstForwarded) return firstForwarded;

  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}
