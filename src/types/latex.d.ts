declare module 'latex.js' {
    class LatexJS {
        compile(latexCode: string, options?: { format: string }): Buffer;
    }
    export { LatexJS };
}
// Compare this snippet from src/app/api/questions/index.ts: