import React, { useEffect, useState } from "react";
import { useQuestionStore } from "../store/questionStore";
import { FaEye } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const Questions: React.FC = () => {
  const { selected, setSelected } = useQuestionStore();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/questions");
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading questions...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const question = questions.find(q => q.id === selected) || questions[0];

  const handleNextQuestion = () => {
    setSelected((selected) % questions.length + 1);
  };

  const handleReviewNextQuestion = () => {
    setSelected((selected) % questions.length + 1);
  };

  const handleSubmitNextQuestion = () => {
    setSelected((selected) % questions.length + 1);
  };

  const handleSubmitMarkQuestion = () => {
    setSelected((selected) % questions.length + 1);
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto p-4">
      {/* Question Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        IIITprep UGEE Mock 9 - SUPR Question {question.id} of {questions.length} <span className="font-bold">(SUPR PHYSICS)</span>
      </h2>

      {/* Question Content */}
      <p className="text-gray-700 font-semibold">Ques:</p>
      <p className="ml-10 text-gray-700 leading-relaxed font-medium">
        {question.q}
      </p>

      {/* Options */}
      <div className="mt-3 ml-3">
        {Object.entries(question.options).map(([key, option]) => (
          <div key={key} className="flex items-center p-1">
            <input
              name={`q${question.id}`}
              className="mr-2 w-4 h-4 text-blue-500 focus:ring-blue-400"
            />
            <span className="text-gray-800 font-medium">({key}) {option}</span>
          </div>
        ))}
      </div>

      {/* Answer Section */}
      <div className="mt-6">
        <p className="text-sm font-bold text-gray-700 mb-2">Answer:</p>
        <ul className="ml-1 text-gray-800 font-medium space-y-1 text-sm">
          {Object.entries(question.options).map(([key, option]) => (
            <li key={key} className="flex items-center space-x-2">
              <input
                type="radio"
                name={`q${question.id}`}
                value={key}
                className="w-4 h-4 text-blue-500 focus:ring-blue-400"
              />
              <label className="cursor-pointer">{key}</label>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="fixed bottom-0 left-0 w-auto bg-white shadow-md p-3 flex justify-start space-x-2">
        <button onClick={handleReviewNextQuestion} className="px-4 py-2 w-48 h-8 text-xs flex items-center gap-2 bg-black text-white border border-gray-300 rounded-none hover:bg-black-600">
          <FaEye className="text-sm" /> Mark for Review & Next
        </button>
        <button onClick={handleNextQuestion} className="px-4 py-2 w-32 h-8 text-xs flex items-center gap-1 bg-blue-500 text-white border border-gray-300 rounded-none hover:bg-blue-600">
          Next Question <MdOutlineArrowForwardIos className="text-sm" />
        </button>
        <button onClick={handleSubmitNextQuestion} className="px-4 py-2 w-48 h-8 text-xs flex items-center gap-1 bg-green-500 text-white border border-gray-300 rounded-none hover:bg-green-600">
          <TiTick className="text-sm" /> Submit Answer and Next
        </button>
        <button onClick={handleSubmitMarkQuestion} className="px-4 py-2 w-48 h-8 text-xs flex items-center gap-1 bg-white text-black border border-gray-300 rounded-none hover:bg-gray-200">
          <TiTick className="text-sm" /> Submit Answer and Mark
        </button>
      </div>
    </div>
  );
};

export default Questions;
