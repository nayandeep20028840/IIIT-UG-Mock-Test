// src/components/QuestionButtons.tsx

import { useQuestionStore } from "@/store/questionStore";

const QuestionButtons: React.FC = () => {
    const { selected, setSelected, questionStatus } = useQuestionStore();

    return (
        <div>
            <div className="flex flex-wrap gap-4 mb-4">
                {Array.from({ length: 129 }, (_, i) => i + 1).map((num) => {
                    const status = questionStatus[num] || {};
                    const { markedForReview, submitted, visited } = status;

                    let buttonClass = "bg-gray-200 border-gray-400 hover:bg-gray-400 rounded"; // Default gray

                    if (submitted) {
                        buttonClass = "bg-green-500 text-white clip-path-trapezium"; // Green trapezium
                    } else if (markedForReview) {
                        buttonClass = "bg-purple-500 text-white rounded-full relative"; // Purple circle
                    } else if (visited) {
                        buttonClass = "bg-red-500 text-white clip-path-trapezium"; // Red trapezium for visited questions
                    }

                    return (
                        <button
                            key={num}
                            onClick={() => setSelected(num)}
                            className={`w-8 h-8 text-sm font-bold border flex items-center justify-center transition-all ${buttonClass}`}
                        >
                            {num}
                            {/* Add a small green mark for "Mark for Review & Next" */}
                            {markedForReview && !submitted && (
                                <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionButtons;
