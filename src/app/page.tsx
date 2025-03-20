

'use client';

import React from "react";
import ExamSummary from "../components/ExamSummary";
import Questions from "@/components/Questions";
import { useQuestionStore } from "@/store/questionStore";

export default function HomePage() {
    const { selected } = useQuestionStore();

    return (
        <div className="flex h-[calc(100vh-60px)]">
            {/* Left box: Questions */}
            <div className="flex-1 bg-white rounded-lg p-4 mr-4 overflow-y-auto shadow-md">
                <Questions />
            </div>

            {/* Right box: ExamSummary */}
            <div className="w-72 bg-white rounded-lg p-4 overflow-y-auto shadow-md">
                <ExamSummary />
            </div>
        </div>
    );
}
