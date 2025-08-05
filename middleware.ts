// import { getAccessTokenWithRefresh } from '@/lib/actions/session';
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export async function middleware(request: NextRequest) {
//     const accessToken = request.cookies.get('access_token')?.value;
//     const refreshToken = request.cookies.get('refresh_token')?.value;

//     if (!accessToken) {
//         console.log("Access token expired, refreshing...");

//         if (!refreshToken) {
//             return NextResponse.redirect(new URL("/sign-in", request.url));
//         }

//         const newAccessToken = await getAccessTokenWithRefresh();
//         if (!newAccessToken) {
//             return NextResponse.redirect(new URL("/sign-in", request.url));
//         }

//         const response = NextResponse.next();
//         response.cookies.set("access_token", newAccessToken, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             maxAge: 60 * 60 * 24 * 30, // 30 days
//             path: "/",
//         });

//         return response;
//     }
//     return NextResponse.next();
// }