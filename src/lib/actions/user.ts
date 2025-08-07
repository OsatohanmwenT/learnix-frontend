"use server";

import { config } from "dotenv";
import { getValidAccessToken } from "./session";

config();

export const fetchUserEnrolledCourses = async ({
  page = 1,
  limit = 10,
}: FetchEnrolledCoursesParams = {}): Promise<EnrolledCoursesResponse | null> => {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      console.error("No access token available");
      throw new Error("Authentication required");
    }

    const searchParams = new URLSearchParams();
    searchParams.append("page", page.toString());
    searchParams.append("limit", limit.toString());

    const response = await fetch(
      `${
        process.env.API_URL
      }/users/me/enrolled-courses?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store", // Prevent caching for dynamic user data
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch enrolled courses: ${response.status} ${response.statusText}`
      );

      if (response.status === 401) {
        throw new Error("Authentication failed");
      }

      throw new Error("Failed to fetch enrolled courses");
    }

    const data = await response.json();
    // console.log("Fetched Enrolled Courses Data:", data);

    return data.data || null;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    throw new Error("An error occurred while fetching enrolled courses");
  }
};

// Get user profile information
export const fetchUserProfile = async (): Promise<any | null> => {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      console.error("No access token available");
      throw new Error("Authentication required");
    }

    const response = await fetch(`${process.env.API_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch user profile: ${response.status} ${response.statusText}`
      );

      if (response.status === 401) {
        throw new Error("Authentication failed");
      }

      throw new Error("Failed to fetch user profile");
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw new Error("An error occurred while fetching user profile");
  }
};

export const fetchUserQuizAttempts = async (
  limit: number = 10
): Promise<QuizAttemptsResponse | null> => {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      console.error("No access token available");
      throw new Error("Authentication required");
    }

    const searchParams = new URLSearchParams();
    searchParams.append("limit", limit.toString());

    const response = await fetch(
      `${process.env.API_URL}/user/me/quiz-attempts?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store", // Prevent caching for dynamic user data
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch quiz attempts: ${response.status} ${response.statusText}`
      );

      if (response.status === 401) {
        throw new Error("Authentication failed");
      }

      throw new Error("Failed to fetch quiz attempts");
    }

    const data = await response.json();
    console.log("Fetched Quiz Attempts Data:", data);

    return data.data || null;
  } catch (error) {
    console.error("Error fetching quiz attempts:", error);
    throw new Error("An error occurred while fetching quiz attempts");
  }
};
