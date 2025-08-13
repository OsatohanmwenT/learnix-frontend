"use client";

import CourseBasicInfoForm from "@/components/course/edit/CourseBasicInfoForm";
import CourseStructureManager from "@/components/course/edit/CourseStructureManager";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourseUpdate } from "@/hooks/useCourseUpdate";
import { fetchCourseById } from "@/lib/actions/courses";
import { editCourseFormSchema, EditCourseFormType } from "@/lib/schema/course";
import { useModuleStore } from "@/stores/moduleStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditCoursePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const { setInitialModules } = useModuleStore();

  const form = useForm<EditCourseFormType>({
    resolver: zodResolver(editCourseFormSchema),
    defaultValues: {
      title: "",
      smallDescription: "",
      price: "",
      description: "",
      category: "Health & Fitness",
      estimatedHours: "",
      thumbnailUrl: "",
      status: "draft",
      difficulty: "beginner",
    },
  });

  const { isLoading, onSubmit } = useCourseUpdate();

  useEffect(() => {
    const getCourseId = async () => {
      try {
        setIsFetching(true);
        const course = await fetchCourseById(params.id);
        console.log("Fetched course:", course);

        if (course) {
          form.reset({
            title: course.title,
            smallDescription: course.smallDescription,
            price: course.price?.toString() || "",
            description: course.description,
            category: course.category,
            estimatedHours: course.estimatedHours?.toString() || "",
            thumbnailUrl: course.thumbnailUrl,
            status: course.status as any,
            difficulty: course.difficulty as any,
          });
          console.log("Reset form with course data:", course);
          setInitialModules(course?.modules || []);
        } else {
          toast.error("Course not found");
          router.push("/instructor/courses");
        }
      } catch (error) {
        console.error("Error loading course:", error);
        toast.error("Failed to load course data");
      } finally {
        setIsFetching(false);
      }
    };
    getCourseId();
  }, [params.id, router]);

  const handleSubmit = (data: EditCourseFormType) => {
    onSubmit(params.id, data);
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2">Loading course...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-2">
        <Link
          href="/instructor/courses"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Link>
      </div>

      <Card className="rounded-sm shadow-none">
        <CardHeader>
          <CardTitle>Edit Course</CardTitle>
          <CardDescription>
            Update your course information and structure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic-info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
              <TabsTrigger value="course-structure">
                Course Structure
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic-info" className="mt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <CourseBasicInfoForm
                    control={form.control}
                    isLoading={isLoading}
                  />
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="course-structure" className="mt-6">
              <CourseStructureManager courseId={params.id} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
