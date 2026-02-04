"use client";

// ==========================================================
// AUTH UTILITY - LocalStorage Based Authentication
// ==========================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "doctor" | "nurse";
}

const AUTH_KEY = "emr_auth_user";
const TOKEN_KEY = "emr_auth_token";

// ==========================================================
// 1. LOGIN
// ==========================================================
export function login(email: string, password: string): User | null {
  // Demo credentials - replace with real API call
  const demoUsers: Record<string, { password: string; user: User }> = {
    "admin@emr.com": {
      password: "admin123",
      user: {
        id: "1",
        email: "admin@emr.com",
        name: "Admin User",
        role: "admin",
      },
    },
    "doctor@emr.com": {
      password: "doctor123",
      user: {
        id: "2",
        email: "doctor@emr.com",
        name: "Dr. Smith",
        role: "doctor",
      },
    },
    "user@emr.com": {
      password: "user123",
      user: {
        id: "3",
        email: "user@emr.com",
        name: "Regular User",
        role: "user",
      },
    },
  };

  const account = demoUsers[email];
  if (account && account.password === password) {
    const token = generateToken();
    localStorage.setItem(AUTH_KEY, JSON.stringify(account.user));
    localStorage.setItem(TOKEN_KEY, token);

    // Set cookies for middleware
    document.cookie = `_token=${token}; path=/; max-age=86400`; // 24 hours
    document.cookie = `_role=${account.user.role}; path=/; max-age=86400`;

    return account.user;
  }

  return null;
}

// ==========================================================
// 2. LOGOUT
// ==========================================================
export function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);

  // Clear cookies
  document.cookie = "_token=; path=/; max-age=0";
  document.cookie = "_role=; path=/; max-age=0";
}

// ==========================================================
// 3. GET CURRENT USER
// ==========================================================
export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem(AUTH_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

// ==========================================================
// 4. CHECK IF AUTHENTICATED
// ==========================================================
export function isAuthenticated(): boolean {
  return !!getCurrentUser() && !!localStorage.getItem(TOKEN_KEY);
}

// ==========================================================
// 5. GET TOKEN
// ==========================================================
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

// ==========================================================
// 6. HELPER: GENERATE TOKEN
// ==========================================================
function generateToken(): string {
  return `token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}
