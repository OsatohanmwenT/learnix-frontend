"use server";

import { config } from "dotenv";
import { getValidAccessToken } from "./session";

config();

export const createModule = async (
  data: ModuleCreateInput
): Promise<ActionResponse> => {
  try {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Please log in to create a module",
      };
    }

    const response = await fetch(`${process.env.API_URL}/modules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: data.title,
        ...(data.description ? { description: data.description } : {}),
        order: typeof data.order === "number" ? data.order : 0,
      }),
    });

    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        success: false,
        message: json?.message || "Failed to create module",
      };
    }
    return { success: true, data: json?.data };
  } catch (error: any) {
    console.error("createModule error:", error);
    return {
      success: false,
      message: "An error occurred while creating module",
    };
  }
};

// Update a module
export const updateModule = async (
  moduleId: string,
  data: Partial<ModuleCreateInput>
): Promise<ActionResponse> => {
  try {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Please log in to update a module",
      };
    }

    const response = await fetch(`${process.env.API_URL}/modules/${moduleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(data),
    });

    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        success: false,
        message: json?.message || "Failed to update module",
      };
    }
    return { success: true, data: json?.data };
  } catch (error: any) {
    console.error("updateModule error:", error);
    return {
      success: false,
      message: "An error occurred while updating module",
    };
  }
};

export const createCourseModule = async (
  courseId: string,
  data: ModuleCreateInput
): Promise<ActionResponse> => {
  try {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Please log in to create a module",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/courses/${courseId}/modules`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: data.title,
          ...(data.description ? { description: data.description } : ""),
          order: typeof data.order === "number" ? data.order : 0,
        }),
      }
    );

    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        success: false,
        message: json?.message || "Failed to create module",
      };
    }
    return { success: true, data: json?.data };
  } catch (error: any) {
    console.error("createCourseModule error:", error);
    return {
      success: false,
      message: "An error occurred while creating module",
    };
  }
};

export const createModuleContent = async (
  moduleId: string,
  data: ContentCreateInput
): Promise<ActionResponse<Lesson>> => {
  try {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Please log in to create lesson content",
      };
    }

    console.log(data)

    const response = await fetch(
      `${process.env.API_URL}/modules/${moduleId}/content`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          contentType: data.contentType,
          contentData: data.contentData,
          order: data.order,
          durationMinutes: data.durationMinutes,
        }),
      }
    );

    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        success: false,
        message: json?.message || "Failed to create lesson content",
      };
    }
    return { success: true, data: json?.data };
  } catch (error: any) {
    console.error("createModuleContent error:", error);
    return {
      success: false,
      message: "An error occurred while creating lesson content",
    };
  }
};

// Delete a module
export const deleteModule = async (
  moduleId: string
): Promise<ActionResponse> => {
  try {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Please log in to delete a module",
      };
    }

    const response = await fetch(`${process.env.API_URL}/modules/${moduleId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const json = await response.json().catch(() => ({}));
      return {
        success: false,
        message: json?.message || "Failed to delete module",
      };
    }
    return { success: true, message: "Module deleted successfully" };
  } catch (error: any) {
    console.error("deleteModule error:", error);
    return {
      success: false,
      message: "An error occurred while deleting module",
    };
  }
};

// Update lesson content
export const updateModuleContent = async (
  contentId: string,
  data: Partial<ContentCreateInput>
): Promise<ActionResponse<Lesson>> => {
  try {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Please log in to update lesson content",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/content/${contentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    const json = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        success: false,
        message: json?.message || "Failed to update lesson content",
      };
    }
    return { success: true, data: json?.data };
  } catch (error: any) {
    console.error("updateModuleContent error:", error);
    return {
      success: false,
      message: "An error occurred while updating lesson content",
    };
  }
};

// Delete lesson content
export const deleteModuleContent = async (
  contentId: string
): Promise<ActionResponse> => {
  try {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Please log in to delete lesson content",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/content/${contentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const json = await response.json().catch(() => ({}));
      return {
        success: false,
        message: json?.message || "Failed to delete lesson content",
      };
    }
    return { success: true, message: "Lesson deleted successfully" };
  } catch (error: any) {
    console.error("deleteModuleContent error:", error);
    return {
      success: false,
      message: "An error occurred while deleting lesson content",
    };
  }
};
