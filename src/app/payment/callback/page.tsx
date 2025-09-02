"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { completeEnrollment } from "@/lib/actions/courses";

type PaymentStatus = "loading" | "success" | "failed" | "cancelled" | "error";

const PaymentCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [courseId, setCourseId] = useState<string | null>(null);
  const [courseTitle, setCourseTitle] = useState<string>("Course");
  const [hasHandled, setHasHandled] = useState(false);

  useEffect(() => {
    const handlePaymentCallback = async () => {
      if (hasHandled) return;

      const reference = searchParams.get("reference");
      const id = searchParams.get("course_id");
      const name = searchParams.get("course_name");

      setCourseId(id);
      setCourseTitle(name || id || "Course");
      setHasHandled(true);

      try {
        if (reference) {
          await completeEnrollment(reference);
          setStatus("success");
          setTimeout(() => {
            window.location.href = `/learn/my-library`;
          }, 1500);
        }
      } catch (error) {
        console.error("Enrollment completion error:", error);
        router.push(`/courses/${id}`);
        setStatus("error");
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Failed to complete enrollment"
        );
      }
    };

    handlePaymentCallback();
  }, [searchParams, hasHandled]);

  useEffect(() => {
    if (status === "success" && courseId) {
      // const timeout = setTimeout(() => {
      //   router.push(`/learn/courses/${courseId}`);
      // }, 3000);
      // return () => clearTimeout(timeout);
    }
  }, [status, courseId, router]);

  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-500" />,
          title: "Payment Successful!",
          message: `You've successfully enrolled in "${courseTitle}".`,
          actionButton: {
            text: "Start Learning",
            onClick: () =>
              (window.location.href = courseId
                ? `/learn/my-library}`
                : "/learn"),
          },
        };
      case "failed":
        return {
          icon: <XCircle className="w-12 h-12 text-red-500" />,
          title: "Payment Failed",
          message: "We couldn't process your payment. Please try again.",
          actionButton: {
            text: "Try Again",
            onClick: () => router.back(),
          },
        };
      case "cancelled":
        return {
          icon: <XCircle className="w-12 h-12 text-yellow-500" />,
          title: "Payment Cancelled",
          message: "You cancelled the payment process.",
          actionButton: {
            text: "Try Again",
            onClick: () => router.back(),
          },
        };
      case "error":
        return {
          icon: <XCircle className="w-12 h-12 text-red-500" />,
          title: "Enrollment Error",
          message:
            errorMessage ||
            "An error occurred while completing your enrollment.",
          actionButton: {
            text: "Try Again",
            onClick: () => router.back(),
          },
        };
      default:
        return {
          icon: <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />,
          title: "Processing Payment...",
          message: "Please wait while we verify your payment.",
          actionButton: null,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-4">
        <div className="flex justify-center">{config.icon}</div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{config.title}</h1>
          <p className="text-muted-foreground">{config.message}</p>
        </div>

        {config.actionButton && (
          <Button
            onClick={config.actionButton.onClick}
            className="w-full"
            size="lg"
            disabled={status === "loading"}
          >
            {status === "loading" && (
              <Loader2 className="animate-spin w-4 h-4 mr-2" />
            )}
            {config.actionButton.text}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaymentCallbackPage;
