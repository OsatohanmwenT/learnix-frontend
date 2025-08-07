"use server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/config/session";
import { cookies } from "next/headers";
import { config } from "dotenv";
import { redirect } from "next/navigation";

config();

// Helper function to check if JWT token is expired
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    // Add a small buffer (30 seconds) to refresh before actual expiration
    return payload.exp <= (currentTime + 30);
  } catch (error) {
    console.error("Error parsing token:", error);
    return true; // If we can't parse it, consider it expired
  }
}

export async function getValidAccessToken(): Promise<any> {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  
  // If token exists and is not expired, return it
  if (accessToken && !isTokenExpired(accessToken)) {
    return accessToken;
  }

  // Token is missing or expired, check if we have refresh token
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  
  if (!refreshToken) {
    console.log("No refresh token available, redirecting to sign-in");
    redirect("/sign-in");
  }

  // Call the refresh route handler
  try {
    const refreshResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Cookie': `${REFRESH_TOKEN_COOKIE}=${refreshToken}`,
      },
    });

    if (!refreshResponse.ok) {
      console.log("Token refresh failed, redirecting to sign-in");
      throw new Error("Token refresh failed");
    }

    const { accessToken: newAccessToken } = await refreshResponse.json();
    return newAccessToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
  }
}

export const getSession = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  const userInfo = cookieStore.get("user_info")?.value;

  return {
    accessToken,
    refreshToken,
    user: userInfo ? JSON.parse(userInfo) : null,
  };
};

export const clearSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
  cookieStore.delete("user_info");
};

// Server Action for manual token refresh (can be called from client)
export async function refreshTokensAction() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/refresh`, {
      method: 'POST',
    });

    if (!response.ok) {
      return { success: false, error: "Token refresh failed" };
    }

    const data = await response.json();
    return { success: true, accessToken: data.accessToken };
  } catch (error) {
    return { success: false, error: "Network error during token refresh" };
  }
}

// Alternative approach: Read-only token getter
export async function getCurrentAccessToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  
  if (!accessToken) {
    return null;
  }

  // Check if token is expired
  if (isTokenExpired(accessToken)) {
    return null;
  }

  return accessToken;
}