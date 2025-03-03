import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import { convertLatexToPDF } from "@/utils/latexParser";

export async function GET() {
    try {
        const latexPath = path.join(process.cwd(), "const", "latexFormat.tex");
        // console.log("LaTeX Path:", latexPath); // correct path
        const outputDir = path.join(process.cwd(), "const");
        // console.log("Output Directory:", outputDir); // correct path
        console.log("Converting LaTeX to PDF...");
        const pdfPath = await convertLatexToPDF(latexPath, outputDir);

        // console.log("Reading PDF...");
        // const dataBuffer = fs.readFileSync(pdfPath);
        // const pdfData = await pdfParse(dataBuffer);
        // console.log("Extracted Text:", pdfData.text);

        // console.log("Extracting Questions...");
        // const questions = extractQuestions(pdfData.text);
        // console.log("Extracted Questions:", questions);

        return NextResponse.json(latexPath);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to process PDF", details: error.message },
            { status: 500 }
        );
    }
}

// Function to extract questions and options from text
function extractQuestions(text: string) {
    const questionRegex = /Q\d+\.\s*(.*?)(?=\n[A-D]\.)/gs;
    const optionRegex = /\n([A-D])\.\s*(.*?)(?=\n[A-D]\.|\nQ\d+\.|\n$)/gs;

    const questionMatches = [...text.matchAll(questionRegex)];
    const optionMatches = [...text.matchAll(optionRegex)];

    return questionMatches.map((qMatch, index) => {
        const questionText = qMatch[1].trim();
        const options: Record<string, string> = {};

        let i = index * 4;
        if (i + 3 < optionMatches.length) {
            options["A"] = optionMatches[i]?.[2]?.trim() || "";
            options["B"] = optionMatches[i + 1]?.[2]?.trim() || "";
            options["C"] = optionMatches[i + 2]?.[2]?.trim() || "";
            options["D"] = optionMatches[i + 3]?.[2]?.trim() || "";
        }

        return { id: index + 1, q: questionText, options };
    });
}

// import { NextResponse } from "next/server";

// export async function GET() {
//     return NextResponse.json(
//         { message: "Hello, World!" }
//     );
// }