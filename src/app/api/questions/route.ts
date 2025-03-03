import { NextResponse } from 'next/server';
import path from 'path';
import { parseLatexFile } from '../../../utils/latexParser';

export async function GET() {
    const filePath = path.join(process.cwd(), 'src/const/latexFormat.tex');
    const questions = parseLatexFile(filePath);
    // console.log(questions);
    return NextResponse.json(questions);
}
