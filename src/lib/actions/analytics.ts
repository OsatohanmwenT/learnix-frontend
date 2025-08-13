"use server";

import type { UserStatisticsResponse } from "@/types/user.d";
import { getValidAccessToken } from "./session";

export const fetchUserAnalytics = async (): Promise<UserStatisticsResponse> => {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        message: "No access token available",
        redirectUrl: "/sign-in",
      };
    }

    const response = await fetch(`${process.env.API_URL}/analytics/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log(errorData);
      return { ...errorData };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching user analytics:", error);
    return {
      success: false,
      message: "Error fetching user analytics",
      redirectUrl: undefined,
    };
  }
};
