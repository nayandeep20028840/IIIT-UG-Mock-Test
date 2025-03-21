// src/components/QuestionButtons.tsx

import { useQuestionStore } from "@/store/questionStore";

const QuestionButtons: React.FC = () => {
    const { selected, setSelected, questionStatus } = useQuestionStore();

    return (
        <div>
            <div className="flex flex-wrap gap-4 mb-4">
                {Array.from({ length: 129 }, (_, i) => i + 1).map((num) => {
                    const isMarkedForReview = questionStatus[num]?.markedForReview;
                    return (
                        <button
                            key={num}
                            onClick={() => setSelected(num)}
                            className={`w-8 h-8 text-sm font-bold border flex items-center justify-center transition-all ${
                                isMarkedForReview
                                    ? "bg-purple-500 text-white rounded-full" // Purple and circular when marked for review
                                    : selected === num
                                    ? "bg-gray-600 border-black text-white rounded"
                                    : "bg-gray-200 border-gray-400 hover:bg-gray-400 rounded"
                            }`}
                        >
                            {num}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionButtons;
