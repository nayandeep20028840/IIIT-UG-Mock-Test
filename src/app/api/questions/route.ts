import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { cleanLatex } from "@/utils/latexParser";

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), "src", "const", "latexFormat.tex");
        const fileContent = await fs.readFile(filePath, "utf-8");

        // Regex to match either "\item " or a line-start number (e.g., "41. ")
        const markerRegex = /\\item\s+|(?:^|\n)(\d+\.\s+)/g;
        let matches;
        const markers = [];

        while ((matches = markerRegex.exec(fileContent)) !== null) {
            markers.push({ index: matches.index, marker: matches[0] });
        }

        // Extract question blocks using marker positions
        const questionBlocks = [];
        for (let i = 0; i < markers.length; i++) {
            const start = markers[i].index;
            const end = i < markers.length - 1 ? markers[i + 1].index : fileContent.length;
            const block = fileContent.slice(start, end).trim();
            questionBlocks.push(block);
        }
        console.log("Found", questionBlocks.length, "question blocks");

        // Process each question block:
        // - Remove the starting marker (either \item or a number+dot)
        // - Split by newlines (or \\) to separate question text and options
        const questions = questionBlocks.map(block => {
            // Remove the leading marker
            const cleanedBlock = block.replace(/^(\\item\s+|\d+\.\s+)/, "").trim();

            // Split the block into lines; also split on '\\' (LaTeX newline) if needed
            const lines = cleanedBlock
                .split(/\\{0,2}[\r\n]+/)
                .map(line => line.trim())
                .filter(line => line.length > 0);

            // The first line is assumed to be the question text
            const questionText = cleanLatex(lines[0]);

            // Remaining lines (if any) are options.
            // Remove option numbers like (1) if present.
            const options = lines.slice(1).map(opt =>
                cleanLatex(opt.replace(/^\(\d+\)\s*/, ""))
            ).filter(opt => opt.length > 0);

            return {
                question: questionText,
                options: options
            };
        });

        return NextResponse.json({ questions });
    } catch (error) {
        console.error("Error reading file:", error);
        return NextResponse.json({ error: "Failed to load the file" }, { status: 500 });
    }
}
