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
  
  if (!accessToken) {
    const result = await refreshAccessToken();
    console.log(result)
    if (result.success) {
      accessToken = result.accessToken;
      console.log("New Access Token:", accessToken);
    } else {
      return null;
    }
  }

  return accessToken;
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
    console.log("Current Refresh Token:", refreshToken);
    
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
      throw new Error(error.detail || "Token refresh failed");
    }

    const { data } = await response.json();

    cookieStore.set(ACCESS_TOKEN_COOKIE, data.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60, // 15 minutes
    });

    return { success: true, accessToken: data.accessToken };
  } catch (error: any) {
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
    cookieStore.delete("user_info");

    return { success: false, message: error.message };
  }
};
