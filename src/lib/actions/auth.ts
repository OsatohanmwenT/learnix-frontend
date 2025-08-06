"use server";

import { config } from "dotenv";
import { LoginSchema, SignUpSchema } from "../schema/auth";
import { cookies } from "next/headers";
import { ACCESS_TOKEN_COOKIE, COOKIE_OPTIONS, REFRESH_TOKEN_COOKIE } from "@/config/session";
config();

export const signIn = async (data: LoginSchema) => {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Login failed");
    }

    const authData = await response.json();
    console.log(authData)
    const cookieStore = await cookies();

    cookieStore.set(ACCESS_TOKEN_COOKIE, authData.data.session.accessToken, {
      ...COOKIE_OPTIONS,
      httpOnly: false, 
      maxAge: 15 * 60, // 15 minutes
    });

    cookieStore.set(REFRESH_TOKEN_COOKIE, authData.data.session.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    cookieStore.set(
      "user_info",
      JSON.stringify({
        id: authData.data.user.id,
        email: authData.data.user.email,
        name: authData.data.user.name,
      }),
      {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60, // 7 days
      }
    );

    return {
      success: true,
      message: "Logged in successfully",
      user: authData.data.user,
    };
  } catch (error) {
    throw error;
  }
};

export const signUp = async (data: SignUpSchema) => {
  try {
    const response = await fetch(`${process.env.API_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Registration failed");
    }

    const authData = await response.json();
    const cookieStore = await cookies();

    cookieStore.set(ACCESS_TOKEN_COOKIE, authData.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60,
    });

    cookieStore.set(REFRESH_TOKEN_COOKIE, authData.refreshToken, {
      ...COOKIE_OPTIONS,
      maxAge: 7 * 24 * 60 * 60,
    });

    cookieStore.set(
      "user_info",
      JSON.stringify({
        id: authData.user.id,
        email: authData.user.email,
        name: authData.user.name,
      }),
      {
        ...COOKIE_OPTIONS,
        maxAge: 7 * 24 * 60 * 60,
      }
    );

    return {
      success: true,
      message: "Registration successful",
      user: authData.user,
    };
  } catch (error) {
    throw error
  }
};

export const signOut = async () => {
  try {
    const cookieStore = await cookies();
    
    // Get refresh token for logout API call (optional)
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
    
    // Call logout API if needed
    if (refreshToken) {
      try {
        await fetch(`${process.env.API_URL}/auth/sign-out`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (error) {
        // Continue with logout even if API call fails
        console.error("Logout API call failed:", error);
      }
    }

    // Clear all auth cookies
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
    cookieStore.delete("user_info");

    return { success: true, message: "Logged out successfully" };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.message || "Logout failed" 
    };
  }
};