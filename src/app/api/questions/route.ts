import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { cleanLatex } from "@/utils/latexParser";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "src", "const", "latexFormat.tex");
        const fileContent = await fs.readFile(filePath, "utf-8");

        // Remove LaTeX tabular (tables) to eliminate answer keys
        const cleanContent = fileContent.replace(/\\begin{tabular}[\s\S]*?\\end{tabular}/g, "");

        // Regex to match "\item " or numbered questions like "41. "
        const markerRegex = /\\item\s+|(?:^|\n)(\d+\.\s+)/g;
        let matches;
        const markers = [];

        while ((matches = markerRegex.exec(cleanContent)) !== null) {
            markers.push({ index: matches.index, marker: matches[0] });
        }

        // Extract question blocks using marker positions
        const questionBlocks = [];
        for (let i = 0; i < markers.length; i++) {
            const start = markers[i].index;
            const end = i < markers.length - 1 ? markers[i + 1].index : cleanContent.length;
            const block = cleanContent.slice(start, end).trim();
            questionBlocks.push(block);
        }

        console.log("Found", questionBlocks.length, "question blocks");

        // Process each question block:
        const questions = questionBlocks.map(block => {
            // Remove the leading marker
            const cleanedBlock = block.replace(/^(\\item\s+|\d+\.\s+)/, "").trim();

            // Split the block into lines
            const lines = cleanedBlock
                .split(/\\{0,2}[\r\n]+/)
                .map(line => line.trim())
                .filter(line => line.length > 0);

            // The first line is the question text
            const questionText = cleanLatex(lines[0]);

            // Remaining lines are options
            const options = lines.slice(1).map(opt =>
                cleanLatex(opt.replace(/^\(\d+\)\s*/, "")) // Remove option numbers
            ).filter(opt => opt.length > 0);

            return questionText ? { question: questionText, options } : null;
        }).filter(Boolean); // Remove null values

        return NextResponse.json({ questions });
    } catch (error) {
        console.error("Error reading file:", error);
        return NextResponse.json({ error: "Failed to load the file" }, { status: 500 });
    }
}
