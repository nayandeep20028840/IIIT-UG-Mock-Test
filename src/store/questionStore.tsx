import { create } from "zustand";

interface QuestionStatus {
    answered: boolean;
    markedForReview: boolean;
}

interface QuestionStore {
    selected: number;
    selectedAnswers: { [key: number]: string | null };
    questionStatus: { [key: number]: QuestionStatus };
    setSelected: (id: number) => void;
    setSelectedAnswer: (questionId: number, answer: string) => void;
    markForReview: (questionId: number) => void;
}

export const useQuestionStore = create<QuestionStore>((set) => ({
    selected: 1,
    selectedAnswers: {},
    questionStatus: {},
    setSelected: (id) => set({ selected: id }),
    setSelectedAnswer: (questionId, answer) =>
        set((state) => ({
            selectedAnswers: { ...state.selectedAnswers, [questionId]: answer },
            questionStatus: {
                ...state.questionStatus,
                [questionId]: { ...state.questionStatus[questionId], answered: true },
            },
        })),
    markForReview: (questionId) =>
        set((state) => ({
            questionStatus: {
                ...state.questionStatus,
                [questionId]: {
                    answered: !!state.selectedAnswers[questionId], // Check if answered
                    markedForReview: true,
                },
            },
        })),
}));
