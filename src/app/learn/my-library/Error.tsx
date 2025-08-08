import React from "react";

const Error = () => {
  return (
    <div className="container mx-auto font-hanken px-8 py-6">
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Library</h1>
        <p className="text-gray-600">
          Manage your enrolled courses and learning progress
        </p>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">
          Failed to load courses. Please try refreshing the page.
        </p>
      </div>
    </div>
  );
};

export default Error;
