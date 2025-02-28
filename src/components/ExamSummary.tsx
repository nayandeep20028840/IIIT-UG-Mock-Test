
"use client";

import React, { useState, useEffect } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import QuestionButtons from "./QuestionButtons";

const ExamSummary: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 60);

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop when timer reaches 0
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert seconds to HH:MM:SS format
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button className="px-9 py-1 border border-red-500 text-red-500 bg-white rounded hover:bg-red-500 hover:text-white transition ml-auto">
          Finish Exam
        </button>
      </div>
      <hr className="mb-2" />
      <h3 className="text-xs font-semibold mb-2 flex items-center gap-1">
        <ClockIcon className="w-4 h-4 text-gray-500" />
        EXAM SUMMARY AND TIMINGS DETAIL
      </h3>
      <hr className="mb-2" />
      <div className="mb-2 bg-blue-50 px-4 py-1 rounded">
        <h1 className="text-black">Time Status</h1>
      </div>
      <div className="mb-2 flex justify-center items-center text-green-700 text-lg font-bold">
        {hours.toString().padStart(2, "0")} : {minutes.toString().padStart(2, "0")} : {seconds.toString().padStart(2, "0")}
      </div>
      <div className="mb-4 bg-white text-black px-4 py-2 border border-gray-400 rounded-lg flex items-center gap-4">
        <h1 className="text-xs font-bold">Total Exam Time</h1>
        <h1 className="text-xs font-bold">01:00:00</h1>
        <h1 className="text-xs font-bold">Hrs</h1>
      </div>
      <hr className="mb-3" />
      <h4 className="font-semibold">IIITprep UGEE Mock 9 - SUPR</h4>
      <h1 className="text-xs mb-4">IIIT Hyderabad UGEE</h1>
      <QuestionButtons />
    </div>
  );
};

export default ExamSummary;
