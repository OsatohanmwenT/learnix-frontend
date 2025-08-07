import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <div className="container mx-auto font-hanken px-8 py-6">
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Library</h1>
        <p className="text-gray-600">
          Manage your enrolled courses and learning progress
        </p>
      </div>
      <div>
        <Tabs defaultValue="all" className="w-full font-hanken">
            <TabsList className="*:data-[state=active]:bg-dark-blue space-x-2 bg-transparent h-auto *:data-[state=active]:text-white">
                <TabsTrigger value="all" className="h-auto px-2 py-2 rounded-xs bg-neutral-200 cursor-pointer">All Courses</TabsTrigger>
                <TabsTrigger value="in-progress" className="h-auto px-2 py-2 bg-neutral-200 rounded-xs cursor-pointer">In Progress</TabsTrigger>
                <TabsTrigger value="completed" className="h-auto px-2 py-2 bg-neutral-200 rounded-xs cursor-pointer">Completed</TabsTrigger>
            </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
