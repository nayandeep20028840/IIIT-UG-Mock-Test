// src/store/questionStore.tsx

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
                [questionId]: {
                    answered: true,
                    markedForReview: state.questionStatus[questionId]?.markedForReview || false,
                },
            },
        })),
    markForReview: (questionId) =>
        set((state) => ({
            questionStatus: {
                ...state.questionStatus,
                [questionId]: {
                    answered: !!state.selectedAnswers[questionId],
                    markedForReview: true, // Set the question as marked for review
                },
            },
        })),
}));
