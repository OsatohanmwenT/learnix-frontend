"use client";

import { completeEnrollment, initiateEnrollment } from "@/lib/actions/courses";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EnrollButton = ({ id, isEnrolled }: { id: string, isEnrolled: boolean | undefined }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const callbackUrl = `http://localhost:3000/payment/callback?course_id=${id}`;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get("reference");

    if (reference) {
      handlePaymentCompletion(reference);
    }
  }, []);

  const handlePaymentCompletion = async (reference: string) => {
    setIsLoading(true);
    try {
      await completeEnrollment(reference);
    } catch (error) {
      console.error("Payment completion failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnrollment = async () => {
    if (!id) return;
    setIsLoading(true);

    try {
      const result = await initiateEnrollment(id, callbackUrl);

      if (!result?.success) {
        toast.error(result.message);
        const redirectUrl = result.redirectUrl || "/sign-in";
        const currentPath = window.location.pathname;

        setTimeout(() => {
          router.push(
            `${redirectUrl}?redirect=${encodeURIComponent(currentPath)}`
          );
        }, 2000);
        return;
      }

      if(result.paymentUrl) {
        localStorage.setItem("pendingEnrollment", JSON.stringify({ courseId: id, reference: result.reference}));
        router.push(result.paymentUrl);
      }

      console.log("Enrollment result:", result);
    } catch (error) {
      toast.error("Enrollment failed. Please try again.");
      console.error("Enrollment failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="bg-emerald-500 hover:bg-emerald-600 rounded-sm h-auto w-auto p-4 px-6 disabled:opacity-50"
      variant={isEnrolled ? "outline" : "default"}
      onClick={handleEnrollment}
      disabled={isLoading || !id || isEnrolled}
    >
      {isLoading ? "Enrolling..." : "Enroll Class"}
    </Button>
  );
};

export default EnrollButton;
