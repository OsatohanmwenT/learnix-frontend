import { Clock, FileBadge } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface Props {
  title: string;
  thumbnail: string;
  difficulty?: DifficultyType;
  instructorId: string;
  instructorName: string;
  description: string;
  price?: number;
  status: CourseStatus;
  estimatedHours?: number;
}

const CourseCard = ({
  title,
  thumbnail,
  description,
  difficulty,
  price,
  status,
  instructorName,
  instructorId,
  estimatedHours,
}: Props) => {
  return (
    <div className="relative p-4 flex flex-col justify-between gap-2 hover:shadow-2xl border border-neutral-200 transition-all group cursor-pointer bg-white rounded-xl">
      <div className="absolute bg-neutral-50 font-poppins text-neutral-700 right-6 p-1 px-2 top-7 font-medium text-xs capitalize z-10 rounded-full">
        {difficulty}
      </div>
      <div className="rounded-lg overflow-clip">
        <Image
          className="object-cover transition-all duration-500 group-hover:scale-105 rounded-lg w-full h-full"
          src={thumbnail || "https://placehold.co/600x400.png"}
          alt={title}
          width={400}
          height={300}
        />
      </div>
      <div className="pt-4">
        <h3 className="text-lg font-bold text-gray-900 font-hanken">{title}</h3>
        <p className="text-sm text-gray-600 font-poppins">
          By {instructorName}
        </p>
        <p className="text-sm text-gray-500 font-poppins line-clamp-2 mt-2">
          {description}
        </p>

        <div className="bg-dark-green/5 w-full text-sm font-poppins p-2 mt-3 flex rounded-lg">
          <div className="flex border-r-2 pl-2 w-full px-4 items-center gap-3">
            <FileBadge className="text-dark-green size-5" />
            <div className="flex flex-col items-start">
              <span className="text-green-900">Lessons</span>
              <span className="text-sm font-medium text-dark-green">
                40 Lessons
              </span>
            </div>
          </div>
          <div className="flex px-4 w-full items-center justify-center gap-3">
            <Clock className="text-dark-green size-5" />
            <div className="flex flex-col">
              <span className="text-green-900">Duration</span>
              <span className="font-medium text-dark-green">
                {estimatedHours} hours
              </span>
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full mt-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold !py-3">
        View Course
      </Button>
    </div>
  );
};

export default CourseCard;
