export function getSubdomain(hostname: string): string | null {
  if (!hostname) return null;

  // For local development on localhost:3000
  if (hostname.includes("localhost")) {
    const parts = hostname.split(".");
    // if it's superadmin.localhost:3000, parts would be ['superadmin', 'localhost:3000']
    // if it's localhost:3000, parts would be ['localhost:3000']
    if (parts.length > 1) {
      return parts[0];
    }
    return null;
  }

  // For production domains like superadmin.megacare.com
  const parts = hostname.split(".");
  if (parts.length > 2) {
    // Return everything before the last two parts (domain.com)
    return parts.slice(0, -2).join(".");
  }

  return null;
}
