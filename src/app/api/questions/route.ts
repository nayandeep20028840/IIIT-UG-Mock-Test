import { NextResponse } from "next/server";
import { promisify } from "util";
import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";

const execPromise = promisify(exec);

export async function GET() {
    try {
        const pdflatexPath = `"C:\\Users\\varsh\\AppData\\Local\\Programs\\MiKTeX\\miktex\\bin\\x64\\pdflatex.exe"`;
        const texFilePath = path.join(process.cwd(), "src", "const", "latexFormat.tex");
        const outputDir = path.join(process.cwd(), "src", "const");
        const outputPdfPath = path.join(outputDir, "latexFormat.pdf");

        console.log("TeX File Path:", texFilePath);
        console.log("Output Directory:", outputDir);
        console.log("Expected PDF Path:", outputPdfPath);

        // Run pdflatex command
        const command = `${pdflatexPath} -interaction=nonstopmode -halt-on-error -output-directory=${outputDir} ${texFilePath}`;
        console.log("Running:", command);

        const { stdout, stderr } = await execPromise(command);
        console.log("pdflatex stdout:", stdout);
        console.error("pdflatex stderr:", stderr);

        // Verify PDF was generated
        const pdfExists = await fs.stat(outputPdfPath).catch(() => null);
        if (!pdfExists || pdfExists.size === 0) {
            throw new Error("PDF file was not generated or is empty.");
        }
        console.log("Generated PDF size:", pdfExists.size);

        // Read the generated PDF
        const pdfBuffer = await fs.readFile(outputPdfPath);

        return new NextResponse(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "attachment; filename=latexFormat.pdf"
            }
        });
    } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
    }
}
