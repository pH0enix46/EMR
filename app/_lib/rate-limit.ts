import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
// - Create a new ratelimiter that allows 10 requests per 60 seconds
export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
  analytics: true, // - Optional: gives you a dashboard on Upstash
});
export async function checkRateLimit(request: Request) {
  // - Use the user's IP address or a fallback
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";

  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  return {
    rateLimited: !success, // - true -> under limit, request allowed. false -> over limit, request blocked
    limit,
    reset,
    remaining,
  };
}
