"use server";

import { config } from "dotenv";
import { getValidAccessToken } from "./session";
import {
  CreateQuizSchema,
  CreateQuestionsSchema,
  EditQuestionSchema,
} from "@/lib/schema/quiz";

config();

export const createQuiz = async (
  quizData: CreateQuizSchema
): Promise<ActionResponse<Quiz>> => {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to create quiz",
      };
    }

    const response = await fetch(`${process.env.API_URL}/quizzes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(quizData),
      cache: "no-store",
    });

    if (response.status === 401) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to create quiz",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to create quiz",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
      message: "Quiz created successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create quiz. Please try again.",
    };
  }
};

export const fetchInstructorQuizzes = async (): Promise<
  ActionResponse<FetchQuiz>
> => {
  try {
    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to fetch quizzes",
      };
    }

    const response = await fetch(`${process.env.API_URL}/quizzes`, {
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
        message: "Authentication required to fetch quizzes",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to fetch quizzes",
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
      message: "Failed to fetch quizzes. Please try again.",
    };
  }
};

export const fetchQuizById = async (
  quizId: string
): Promise<ActionResponse<Quiz>> => {
  try {
    if (!quizId) {
      return {
        success: false,
        message: "Quiz ID is required",
      };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to fetch quiz",
      };
    }

    const response = await fetch(`${process.env.API_URL}/quizzes/${quizId}`, {
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
        message: "Authentication required to fetch quiz",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to fetch quiz",
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
      message: "Failed to fetch quiz. Please try again.",
    };
  }
};

export const addQuestionsToQuiz = async (
  quizId: string,
  questionsData: CreateQuestionsSchema
): Promise<ActionResponse<CreateQuestion>> => {
  try {
    if (!quizId) {
      return {
        success: false,
        message: "Quiz ID is required",
      };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to add questions",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/quizzes/${quizId}/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(questionsData),
        cache: "no-store",
      }
    );

    if (response.status === 401) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to add questions",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to add questions",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
      message: "Questions added successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to add questions. Please try again.",
    };
  }
};

export const updateQuiz = async (
  quizId: string,
  quizData: Partial<CreateQuizSchema>
): Promise<ActionResponse<Quiz>> => {
  try {
    if (!quizId) {
      return {
        success: false,
        message: "Quiz ID is required",
      };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to update quiz",
      };
    }

    const response = await fetch(`${process.env.API_URL}/quizzes/${quizId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(quizData),
      cache: "no-store",
    });

    if (response.status === 401) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to update quiz",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to update quiz",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
      message: "Quiz updated successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update quiz. Please try again.",
    };
  }
};

export const deleteQuiz = async (quizId: string): Promise<ActionResponse> => {
  try {
    if (!quizId) {
      return {
        success: false,
        message: "Quiz ID is required",
      };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to delete quiz",
      };
    }

    const response = await fetch(`${process.env.API_URL}/quizzes/${quizId}`, {
      method: "DELETE",
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
        message: "Authentication required to delete quiz",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to delete quiz",
      };
    }

    return {
      success: true,
      message: "Quiz deleted successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete quiz. Please try again.",
    };
  }
};

export const updateQuestion = async (
  questionId: string,
  questionData: EditQuestionSchema
): Promise<ActionResponse<Question>> => {
  try {
    if (!questionId) {
      return {
        success: false,
        message: "Question ID is required",
      };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to update question",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/quizzes/questions/${questionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(questionData),
        cache: "no-store",
      }
    );

    if (response.status === 401) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to update question",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to update question",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data.data,
      message: "Question updated successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to update question. Please try again.",
    };
  }
};

export const deleteQuestion = async (
  questionId: string
): Promise<ActionResponse> => {
  try {
    if (!questionId) {
      return {
        success: false,
        message: "Question ID is required",
      };
    }

    const accessToken = await getValidAccessToken();

    if (!accessToken) {
      return {
        success: false,
        redirectUrl: "/sign-in",
        message: "Authentication required to delete question",
      };
    }

    const response = await fetch(
      `${process.env.API_URL}/quizzes/questions/${questionId}`,
      {
        method: "DELETE",
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
        message: "Authentication required to delete question",
      };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: errorData.message || "Failed to delete question",
      };
    }

    return {
      success: true,
      message: "Question deleted successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete question. Please try again.",
    };
  }
};
