// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Helper function to validate JWT token (basic check)
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch {
    return true; // If we can't parse it, consider it expired
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // If no access token or access token is expired, try to refresh
  if (!accessToken || isTokenExpired(accessToken)) {
    console.log("Access token missing or expired, attempting refresh...");
    
    if (!refreshToken) {
      console.log("No refresh token available, redirecting to sign-in");
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      // Call refresh endpoint directly in middleware
      const refreshResponse = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshResponse.ok) {
        console.log("Token refresh failed, redirecting to sign-in");
        const response = NextResponse.redirect(new URL("/sign-in", request.url));
        // Clear all auth cookies
        response.cookies.delete('access_token');
        response.cookies.delete('refresh_token');
        response.cookies.delete('user_info');
        return response;
      }

      const { data } = await refreshResponse.json();
      
      const response = NextResponse.next();
      response.cookies.set("access_token", data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 15 * 60, // 15 minutes
        path: "/",
      });

      // Optionally update refresh token if backend provides a new one
      if (data.refreshToken) {
        response.cookies.set("refresh_token", data.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });
      }

      console.log("Token refreshed successfully");
      return response;
    } catch (error) {
      console.error("Error during token refresh:", error);
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      // Clear all auth cookies
      response.cookies.delete('access_token');
      response.cookies.delete('refresh_token');
      response.cookies.delete('user_info');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - sign-in, sign-up (auth pages)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up).*)',
  ],
}
