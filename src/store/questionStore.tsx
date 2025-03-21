// src/store/questionStore.tsx

import { create } from "zustand";

interface QuestionStatus {
    answered: boolean;
    markedForReview: boolean;
    submitted: boolean;
    visited: boolean; // NEW: Track if the question has been visited
}

interface QuestionStore {
    selected: number;
    selectedAnswers: { [key: number]: string | null };
    questionStatus: { [key: number]: QuestionStatus };
    setSelected: (id: number) => void;
    setSelectedAnswer: (questionId: number, answer: string) => void;
    markForReview: (questionId: number) => void;
    submitAnswer: (questionId: number) => void;
    visitQuestion: (questionId: number) => void; // NEW FUNCTION
}

export const useQuestionStore = create<QuestionStore>((set) => ({
    selected: 1,
    selectedAnswers: {},
    questionStatus: {},
    setSelected: (id) =>
        set((state) => ({
            selected: id,
            questionStatus: {
                ...state.questionStatus,
                [id]: {
                    ...state.questionStatus[id],
                    visited: true, // Mark as visited when selected
                },
            },
        })),
    setSelectedAnswer: (questionId, answer) =>
        set((state) => ({
            selectedAnswers: { ...state.selectedAnswers, [questionId]: answer },
            questionStatus: {
                ...state.questionStatus,
                [questionId]: {
                    answered: true,
                    markedForReview: state.questionStatus[questionId]?.markedForReview || false,
                    submitted: state.questionStatus[questionId]?.submitted || false,
                    visited: true,
                },
            },
        })),
    markForReview: (questionId) =>
        set((state) => ({
            questionStatus: {
                ...state.questionStatus,
                [questionId]: {
                    answered: !!state.selectedAnswers[questionId],
                    markedForReview: true,
                    submitted: state.questionStatus[questionId]?.submitted || false,
                    visited: true,
                },
            },
        })),
    submitAnswer: (questionId) =>
        set((state) => ({
            questionStatus: {
                ...state.questionStatus,
                [questionId]: {
                    answered: !!state.selectedAnswers[questionId],
                    markedForReview: state.questionStatus[questionId]?.markedForReview || false,
                    submitted: true, // Mark as submitted
                    visited: true,
                },
            },
        })),
    visitQuestion: (questionId) => // ✅ NEW FUNCTION TO FIX ERROR
        set((state) => ({
            questionStatus: {
                ...state.questionStatus,
                [questionId]: {
                    ...state.questionStatus[questionId],
                    visited: true, // Mark as visited
                },
            },
        })),
}));
