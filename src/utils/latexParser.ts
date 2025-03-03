import fs from "fs";
import path from "path";
import { exec } from "child_process";

/**
 * Converts a LaTeX file to a PDF.
 * @param latexFilePath Path to the LaTeX (.tex) file
 * @param outputDir Directory where the PDF should be saved
 * @returns The path to the generated PDF file
 */
export async function convertLatexToPDF(latexFilePath: string, outputDir: string): Promise<string> {
    return new Promise((resolve, reject) => {
        // console.log("Compiling LaTeX...");
        console.log(latexFilePath)
        console.log(outputDir)
        if (!fs.existsSync(latexFilePath)) {
            // console.log("LaTeX file not found.");
            return reject(new Error("LaTeX file not found."));
        }
        // console.log("Compiling LaTeX...");
        // Ensure the output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const command = `pdflatex -output-directory=${outputDir} ${latexFilePath}`;
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error("LaTeX compilation error:", stderr);
                return reject(new Error("Failed to compile LaTeX."));
            }

            console.log("LaTeX compiled successfully:", stdout);
            const pdfFilePath = path.join(outputDir, path.basename(latexFilePath, ".tex") + ".pdf");

            if (!fs.existsSync(pdfFilePath)) {
                return reject(new Error("PDF file not generated."));
            }

            resolve(pdfFilePath);
        });
    });
}
