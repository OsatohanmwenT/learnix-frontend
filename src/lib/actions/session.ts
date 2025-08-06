"use server";

import {
  ACCESS_TOKEN_COOKIE,
  COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE,
} from "@/config/session";
import { cookies } from "next/headers";
import { config } from "dotenv";

config();

export async function getAccessTokenWithRefresh() {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("access_token")?.value;
  
  // Check if token exists and is not expired
  if (accessToken && !isTokenExpired(accessToken)) {
    return accessToken;
  }

  // Token is missing or expired, try to refresh
  const result = await refreshAccessToken();
  console.log("Refresh result:", result);
  
  if (result.success) {
    return result.accessToken;
  }
  
  return null;
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

export const refreshAccessToken = async () => {
  const cookieStore = await cookies();
  
  try {
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
    console.log("Attempting token refresh...");
    
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `Token refresh failed: ${response.status}`);
    }

    const { data } = await response.json();
    
    // Set new access token
    cookieStore.set(ACCESS_TOKEN_COOKIE, data.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60, // 15 minutes
    });

    // Update refresh token if provided
    if (data.refreshToken) {
      cookieStore.set(REFRESH_TOKEN_COOKIE, data.refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    console.log("Token refresh successful");
    return { success: true, accessToken: data.accessToken };
    
  } catch (error: any) {
    console.error("Token refresh failed:", error.message);
    
    // Clear all authentication cookies on failure
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
    cookieStore.delete("user_info");
    
    return { success: false, message: error.message };
  }
};

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

// Additional utility function for client-side usage
export const clearSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
  cookieStore.delete("user_info");
};