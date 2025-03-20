// components/QuestionButtons.tsx

'use client'

import { useQuestionStore } from "@/store/questionStore";

const QuestionButtons: React.FC = () => {
    const { selected, setSelected } = useQuestionStore();

    return (
        <div>
            <div className="flex flex-wrap gap-4 mb-4">
                {Array.from({ length: 129 }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        onClick={() => setSelected(num)}
                        className={`w-8 h-8 text-white text-sm font-bold border flex flex-col items-center justify-center ${selected === num
                                ? "bg-blue-600 border-black"
                                : "bg-green-300 border-green-400 hover:bg-green-700"
                            }`}
                    >
                        {selected === num && <span className="text-white -mt-3 text-base leading-none">-</span>}
                        {num}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default QuestionButtons;
