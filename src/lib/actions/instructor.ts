"use server";

import { config } from "dotenv";
import { getValidAccessToken } from "./session";
import { FetchRecentCoursesResponse, InstructorAnalyticsResponse, RecentCourse } from "@/types/instructor";

config();

export const fetchInstructorAnalytics =
  async (): Promise<InstructorAnalyticsResponse> => {
    try {
      const accessToken = await getValidAccessToken();

      if (!accessToken) {
        console.error("No access token available");
        return {
          success: false,
          error: "Authentication required",
          redirectUrl: "/sign-in",
        };
      }

      const response = await fetch(
        `${process.env.API_URL}/analytics/instructor`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          cache: "no-store", // Prevent caching for dynamic data
        }
      );

      if (!response.ok) {
        console.error(
          `Failed to fetch instructor analytics: ${response.status} ${response.statusText}`
        );

        if (response.status === 401) {
          return {
            success: false,
            error: "Authentication failed",
            redirectUrl: "/sign-in",
          };
        }

        return {
          success: false,
          error: "Failed to fetch instructor analytics",
        };
      }

      const data = await response.json();

      return {
        success: true,
        data: data.data,
      };
    } catch (error) {
      console.error("Error fetching instructor analytics:", error);
      return {
        success: false,
        error: "An error occurred while fetching instructor analytics",
      };
    }
  };

export const fetchInstructorRecentCourses =
  async ({ limit = 10 }: { limit?: number }): Promise<FetchRecentCoursesResponse> => {
    try {
      const accessToken = await getValidAccessToken();

      if (!accessToken) {
        return {
          success: false,
          error: "Authentication required",
          redirectUrl: "/sign-in",
        };
      }

      const response = await fetch(`${process.env.API_URL}/courses/instructor/recent?limit=${limit}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      });

      if (!response.ok) {
        if (response.status === 401) {
          return {
            success: false,
            error: "Authentication failed",
            redirectUrl: "/sign-in",
          };
        }

        return {
          success: false,
          error: `Failed to fetch recent courses: ${response.statusText}`,
        };
      }

      const data = await response.json();
      return {
        success: true,
        message: data?.message,
        data: data?.data,
      };
    } catch (error) {
      console.error("Error fetching recent courses:", error);
      return {
        success: false,
        error: "An error occurred while fetching recent courses",
      };
    }
  };
