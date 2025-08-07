import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ACCESS_TOKEN_COOKIE,
  COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE,
} from "@/config/session";

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token available' },
        { status: 401 }
      );
    }

    const response = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      const errorResponse = NextResponse.json(
        { error: 'Token refresh failed' },
        { status: 401 }
      );
      errorResponse.cookies.delete(ACCESS_TOKEN_COOKIE);
      errorResponse.cookies.delete(REFRESH_TOKEN_COOKIE);
      errorResponse.cookies.delete('user_info');
      return errorResponse;
    }

    const { data } = await response.json();

    const successResponse = NextResponse.json(
      { success: true, accessToken: data.accessToken },
      { status: 200 }
    );

    // Set new tokens in cookies
    successResponse.cookies.set(ACCESS_TOKEN_COOKIE, data.accessToken, {
      ...COOKIE_OPTIONS,
      maxAge: 15 * 60, // 15 minutes
    });

    if (data.refreshToken) {
      successResponse.cookies.set(REFRESH_TOKEN_COOKIE, data.refreshToken, {
        ...COOKIE_OPTIONS,
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    return successResponse;
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}