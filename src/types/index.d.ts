type DifficultyType = "beginner" | "intermediate" | "advanced" | "expert";
type CourseStatus = "published" | "draft";

interface Tag {
    id: string;
    label: string;
    count: number;
}

interface Course {
    id: string;
    title: string;
    thumbnail: string;
    difficulty: DifficultyType;
    instructorId: string;
    instructorName: string;
    description: string;
    price: number;
    status: CourseStatus;
    estimatedHours: number;
    createdAt: Date;
}

interface FetchCourseResponse {
    courses: Course[];
    total?: number;
    page?: number;
    limit?: number;
}

type AuthMode = "login" | "signup";