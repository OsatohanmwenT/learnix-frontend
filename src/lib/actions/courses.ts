"use server";

import { config } from "dotenv";
import { redirect } from "next/navigation";
import { getAccessTokenWithRefresh } from "./session";

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

// Fetch a single course by its ID (public - no auth required)
export const fetchCourseById = async (id: string): Promise<Course | null> => {
  try {
    if (!id) {
      console.error("Course ID is required");
      return null;
    }

    const response = await fetch(`${process.env.API_URL}/courses/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Prevent caching for dynamic content
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch course: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const data = await response.json();
    console.log("Fetched Course Data:", data);

    // Return just the course data, not wrapped in additional structure
    return data.data?.course || data.data || null;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw new Error("An error occurred while fetching the course");
  }
};

// Fetch a single course by its ID with authentication (for enrolled users)
export const fetchCourseByIdAuthenticated = async (
  id: string
): Promise<FetchCourseByIdResponse | null> => {
  try {
    if (!id) {
      console.error("Course ID is required");
      return null;
    }

    // Try to get access token, but don't fail if it's not available
    let accessToken: string | null = null;
    try {
      const token = await getAccessTokenWithRefresh();
      accessToken = token || null;
    } catch (tokenError) {
      console.warn(
        "Failed to get access token, proceeding without authentication:",
        tokenError
      );
    }

    const response = await fetch(`${process.env.API_URL}/courses/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      cache: "no-store", // Prevent caching for dynamic content
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch course: ${response.status} ${response.statusText}`
      );

      // If it's an auth error and we have no token, try fallback to public endpoint
      if (response.status === 401 && !accessToken) {
        console.log("Auth failed, falling back to public course fetch");
        const publicCourse = await fetchCourseById(id);
        return publicCourse
          ? {
              course: publicCourse,
              isEnrolled: false,
              enrollment: null,
            }
          : null;
      }

      return null;
    }

    const data = await response.json();
    console.log("Fetched Authenticated Course Data:", data);

    // Return the full response structure with enrollment info
    return data.data || null;
  } catch (error) {
    console.error("Error fetching authenticated course:", error);

    // Fallback to public course fetch if authentication fails
    console.log("Falling back to public course fetch due to error");
    try {
      const publicCourse = await fetchCourseById(id);
      return publicCourse
        ? {
            course: publicCourse,
            isEnrolled: false,
            enrollment: null,
          }
        : null;
    } catch (fallbackError) {
      console.error("Fallback fetch also failed:", fallbackError);
      return null;
    }
  }
};

// Server action for course enrollment
export const initiateEnrollment = async (
  courseId: string,
  callbackUrl: string
) => {
  try {
    const accessToken = await getAccessTokenWithRefresh();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Please log in to enroll in this course",
      };
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
      return {
        success: true,
        paymentUrl: data.data.paymentUrl,
        reference: data.data.reference,
      };
    } else {
      return {
        success: true,
        message: "Successfully enrolled in course!",
        courseId,
      };
    }
  } catch (error: any) {
    console.error("Enrollment error:", error);
    return { success: false, message: error?.message || "Failed to enroll in course" };
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

// Server action for creating a new course
export const createCourse = async (courseData: {
  title: string;
  description: string;
  estimatedHours: number;
  thumbnailUrl: string;
  status: CourseStatus;
  difficulty: DifficultyType;
  price?: number;
}) => {
  try {
    const accessToken = await getAccessTokenWithRefresh();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Please log in to create a course",
      };
    }

    const {
      title,
      description,
      estimatedHours,
      thumbnailUrl,
      status,
      difficulty,
      price,
    } = courseData;

    // Validate required fields
    if (
      !title ||
      !description ||
      !estimatedHours ||
      !thumbnailUrl ||
      !status ||
      !difficulty
    ) {
      throw new Error("All required fields must be provided");
    }

    const response = await fetch(`${process.env.API_URL}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title,
        description,
        estimatedHours,
        thumbnailUrl,
        status,
        difficulty,
        ...(price && { price }),
      }),
    });

    if (response.status === 401) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to create a course",
      };
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create course");
    }

    const data = await response.json();

    return {
      success: true,
      message: "Course created successfully!",
      course: data.data,
    };
  } catch (error) {
    console.error("Course creation error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create course"
    );
  }
};
