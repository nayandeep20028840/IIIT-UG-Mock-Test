import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { cleanLatex } from "@/utils/latexParser"; // Import the function

export async function GET() {
    try {
        // Update the file path to match the correct location
        const filePath = path.join(process.cwd(), "src", "const", "latexFormat.tex");
        // console.log("Reading file:", filePath);
        
        const fileContent = await fs.readFile(filePath, "utf-8");

        // Extract question blocks using regex
        const questionBlocks = fileContent.match(/\\item\s+(.*?)(?=(\\item|\n\\end{enumerate}))/gs) || [];
        console.log("Found", questionBlocks.length, "questions");

        // Process questions and options
        const questions = questionBlocks.map(block => {
            const [questionText, ...optionsRaw] = block.split(/\\\(/);
            const options = optionsRaw.map(opt => cleanLatex(opt.replace(/\(\d+\)/, "").trim()));

            return {
                question: cleanLatex(questionText.replace("\\item", "").trim()),
                options: options.filter(opt => opt.length > 0)
            };
        });

        return NextResponse.json({ questions });
    } catch (error) {
        console.error("Error reading file:", error);
        return NextResponse.json({ error: "Failed to load the file" }, { status: 500 });
    }
}
