import fs from "fs";
import path from "path";

export const parseLatexFile = (filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");

    const questionRegex = /\\item\s+([\s\S]*?)(?=\n\s*\\item|$)/g;
    const optionRegex = /\((\d+)\)\s*([\s\S]*?)(?=\(\d+\)|$)/g;

    const questions = [];
    let id = 1;

    let match;
    while ((match = questionRegex.exec(content)) !== null) {
        const questionText = match[1].trim();

        // Extract options
        let options = {};
        let optMatch;
        while ((optMatch = optionRegex.exec(questionText)) !== null) {
            options[optMatch[1]] = optMatch[2].trim();
        }

        // Remove options from question text
        const cleanQuestion = questionText.replace(optionRegex, "").trim();

        questions.push({ id, q: cleanQuestion, options });
        id++;
    }

    return questions;
};
