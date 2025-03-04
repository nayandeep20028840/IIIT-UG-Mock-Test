import React from "react";
import { FaEye } from "react-icons/fa";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { TiTick } from "react-icons/ti";

interface BottomNavigationProps {
  onNext: () => void;
  onReviewNext: () => void;
  onSubmitNext: () => void;
  onSubmitMark: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  onNext,
  onReviewNext,
  onSubmitNext,
  onSubmitMark,
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-auto bg-white shadow-md p-3 flex justify-start space-x-2">
      <button
        onClick={onReviewNext}
        className="px-4 py-2 w-48 h-8 text-xs flex items-center gap-2 bg-black text-white border border-gray-300 rounded-none hover:bg-black-600"
      >
        <FaEye className="text-sm" /> Mark for Review & Next
      </button>
      <button
        onClick={onNext}
        className="px-4 py-2 w-32 h-8 text-xs flex items-center gap-1 bg-blue-500 text-white border border-gray-300 rounded-none hover:bg-blue-600"
      >
        Next Question <MdOutlineArrowForwardIos className="text-sm" />
      </button>
      <button
        onClick={onSubmitNext}
        className="px-4 py-2 w-48 h-8 text-xs flex items-center gap-1 bg-green-500 text-white border border-gray-300 rounded-none hover:bg-green-600"
      >
        <TiTick className="text-sm" /> Submit Answer and Next
      </button>
      <button
        onClick={onSubmitMark}
        className="px-4 py-2 w-48 h-8 text-xs flex items-center gap-1 bg-white text-black border border-gray-300 rounded-none hover:bg-gray-200"
      >
        <TiTick className="text-sm" /> Submit Answer and Mark
      </button>
    </div>
  );
};

export default BottomNavigation;
