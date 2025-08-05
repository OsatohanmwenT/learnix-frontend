"use server";

import { config } from "dotenv";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { success } from "zod";
import { getAccessTokenWithRefresh } from "./session";

config();

const ACCESS_TOKEN_COOKIE = "access_token";

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
      difficulty.map((d) => searchParams.append("difficulty", d));
    }

    if (duration.length > 0) {
      duration.map((d) => searchParams.append("duration", d));
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

// Fetch a single course by its ID
export const fetchCourseById = async (id: string): Promise<FetchCourseByIdResponse| null> => {
  try {
    const response = await fetch(`${process.env.API_URL}/courses/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch course");
    }
    const data = await response.json();
    console.log("Fetched Course Data:", data);
    return data.data || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Server action for course enrollment
export const initiateEnrollment = async (courseId: string, callbackUrl: string) => {
  try {
    const accessToken = await getAccessTokenWithRefresh();

    if (!accessToken) {
      return { success: false, redirectUrl: "/sign-in", message: "Please log in to enroll in this course" };
    }

    const response = await fetch(
      `${process.env.API_URL}/courses/${courseId}/enroll`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ callback_url: callbackUrl }),
      }
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Enrollment failed");
    }

    const data = await response.json();

    if (data.data?.paymentUrl) {
      return { success: true, paymentUrl: data.data.paymentUrl, reference: data.data.reference };
    } else {
      return {
        success: true,
        message: "Successfully enrolled in course!",
        courseId,
      };
    }
  } catch (error) {
    console.error("Enrollment error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to enroll in course"
    );
  }
};


// Server action for completing enrollment after payment
export const completeEnrollment = async (reference: string) => {
  try {
    const accessToken = await getAccessTokenWithRefresh();

    if (!accessToken) {
      redirect("/sign-in");
    }

    const response = await fetch(
      `${process.env.API_URL}/courses/enroll/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ reference }),
      }
    );

    if (response.status === 401) {
      redirect("/sign-in");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Payment verification failed");
    }

    // Redirect to the course page after successful enrollment
    if (data.data?.course?.id) {
      redirect(`/courses/${data.data.course.id}`);
    } else {
      redirect("/courses");
    }
  } catch (error) {
    console.error("Payment completion error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to complete enrollment"
    );
  }
};
