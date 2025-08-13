import { useState } from "react";
import { toast } from "sonner";

interface OptimisticUpdateOptions {
  successMessage?: string;
  errorMessage?: string;
  onError?: () => void;
  onSuccess?: () => void;
}

export function useOptimisticUpdate() {
  const [isLoading, setIsLoading] = useState(false);

  const performOptimisticUpdate = async <T>(
    asyncOperation: () => Promise<ActionResponse<T>>,
    options: OptimisticUpdateOptions = {}
  ) => {
    const {
      successMessage = "Operation completed successfully",
      errorMessage = "Operation failed",
      onError,
      onSuccess,
    } = options;

    setIsLoading(true);

    try {
      const response = await asyncOperation();

      if (response.success) {
        if (successMessage) {
          toast.success(successMessage);
        }
        onSuccess?.();
      } else {
        if (errorMessage) {
          toast.error(response.message || errorMessage);
        }
        onError?.();
      }

      return response;
    } catch (error) {
      console.error("Optimistic update failed:", error);
      toast.error(errorMessage);
      onError?.();
      return { success: false, message: errorMessage } as ActionResponse<T>;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    performOptimisticUpdate,
    isLoading,
  };
}
