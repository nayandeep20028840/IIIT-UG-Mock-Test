import React from "react";
import { questions } from "../const/sample";
import { useQuestionStore } from "../store/questionStore";
import { FaEye } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { TiTick } from "react-icons/ti";


const Questions: React.FC = () => {
  const { selected, setSelected } = useQuestionStore();
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
  }

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <div className="flex-grow p-4">
        <h2 className="mb-2 text-xl font-semibold">
          Question {question.id} of 50 (SUPR PHYSICS)
        </h2>
        <p className="mb-4">{question.q}</p>

        <ul className="space-y-2 mb-4">
          {Object.entries(question.options).map(([key, option]) => (
            <li key={key}>
              <label className="flex items-center space-x-2">
                <input type="radio" name={`q${question.id}`} />
                <span>({key}) {option}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

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
