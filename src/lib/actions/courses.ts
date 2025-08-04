"use server";

import { config } from "dotenv";

config();

interface FetchCoursesParams {
  limit?: number;
  page?: number;
  query?: string;
  sortBy?: string;
  difficulty?: string[];
  duration?: string[];
}

export const fetchCourses = async ({
  limit,
  page,
  query = "",
  sortBy = "createdAt",
  difficulty = [],
  duration = [],
}: FetchCoursesParams): Promise<FetchCourseResponse> => {
  try {
    const searchParams = new URLSearchParams();

    if (limit) searchParams.append("limit", limit.toString());
    if (page) searchParams.append("page", page.toString());
    if (query) searchParams.append("query", encodeURIComponent(query));
    if (sortBy) searchParams.append("sort", sortBy);
    
    if (difficulty.length > 0) {
      difficulty.map((d) => (searchParams.append("difficulty", d)));
    }

    if (duration.length > 0) {
      duration.map((d) => (searchParams.append("duration", d)));
    }

    const response = await fetch(
      `${process.env.API_URL}/courses?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching courses");
  }
};
