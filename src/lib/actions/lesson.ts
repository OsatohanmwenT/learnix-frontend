"use server";

import { config } from "dotenv";
import { getValidAccessToken } from "./session";

config();

export const fetchLessonById = async (
  lessonId: string
): Promise<ActionResponse<Lesson>> => {
  try {
    if (!lessonId) {
      return {
        success: false,
        message: "Lesson ID is required",
      };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to fetch lesson",
      };
    }

    const response = await fetch(`${process.env.API_URL}/content/${lessonId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (response.status === 401) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to fetch lesson",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to fetch lesson",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch lesson. Please try again.",
    };
  }
};

export const completeLessonById = async (
  lessonId: string
): Promise<ActionResponse> => {
  try {
    if (!lessonId) {
      return {
        success: false,
        message: "Lesson ID is required",
      };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to complete lesson",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/content/${lessonId}/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (response.status === 401) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to complete lesson",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to complete lesson",
      };
    }

    return {
      success: true,
      message: "Lesson completed successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to complete lesson. Please try again.",
    };
  }
};

export const fetchCourseWithProgress = async (
  courseId: string
): Promise<ActionResponse<Course & { progressPercentage: number }>> => {
  try {
    if (!courseId) {
      return {
        success: false,
        message: "Course ID is required",
      };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to fetch course progress",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/courses/${courseId}/progress`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (response.status === 401) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to fetch course progress",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to fetch course progress",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch course progress. Please try again.",
    };
  }
};

export const fetchCourseByLessonId = async (
  courseId: string
): Promise<
  ActionResponse<
    Course & { progressPercentage: number; currentLessonId: string }
  >
> => {
  try {
    if (!courseId) {
      return {
        success: false,
        message: "Course ID is required",
      };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to fetch course data",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/content/progress/${courseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (response.status === 401) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to fetch course data",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to fetch course data",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: { ...data.data },
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch course data. Please try again.",
    };
  }
};
