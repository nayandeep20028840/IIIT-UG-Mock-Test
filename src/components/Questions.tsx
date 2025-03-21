// src/components/Questions.tsx

import React, { useEffect, useState } from "react";
import { useQuestionStore } from "../store/questionStore";
import BottomNavigation from "../components/BottomNavigation";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";

interface Question {
    id: number;
    question: string;
    options: string[];
}

const Questions: React.FC = () => {
    const { selected, setSelected, selectedAnswers, setSelectedAnswer } = useQuestionStore();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch("/api/questions");
                const data = await response.json();
                setQuestions(data.questions);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    if (loading) return <p className="text-center text-gray-600">Loading questions...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const totalQuestions = questions.length;
    const currentQuestion = questions.find((q) => q.id === selected) || null;

    const handleNextQuestion = () => setSelected((selected % totalQuestions) + 1);
    const handleReviewNextQuestion = () => setSelected((selected % totalQuestions) + 1);

    return (
        <div className="flex flex-col h-screen overflow-y-auto p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Question {currentQuestion?.id || "-"} of {totalQuestions}
            </h2>

            <p className="text-gray-700 font-semibold">Ques:</p>
            <div className="ml-10 text-gray-700 leading-relaxed font-medium whitespace-pre-wrap">
                <Latex>{currentQuestion?.question || "No question available"}</Latex>
            </div>

            <BottomNavigation
                onNext={handleNextQuestion}
                onReviewNext={handleReviewNextQuestion}
                onSubmitNext={handleNextQuestion}
                onSubmitMark={handleNextQuestion}
            />
        </div>
    );
};

export default Questions;
