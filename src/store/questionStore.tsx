// store/questionStore.tsx

import { create } from 'zustand';

interface QuestionStore {
    selected: number;
    setSelected: (id: number) => void;
}

export const useQuestionStore = create<QuestionStore>((set) => ({
    selected: 1,
    setSelected: (id) => set({ selected: id }),
}));