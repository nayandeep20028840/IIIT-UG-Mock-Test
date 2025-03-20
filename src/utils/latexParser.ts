// utils/latexParser.ts

export function cleanLatex(text: string): string {
    return text
        // Replace non-breaking spaces with a normal space
        .replace(/~/g, " ")
        // Replace common LaTeX commands with corresponding symbols
        .replace(/\\circ/g, "°")
        .replace(/\\prime/g, "′")
        .replace(/\\lambda/g, "λ")
        .replace(/\\neq/g, "≠")
        .replace(/\\cap/g, "∩")
        .replace(/\\cup/g, "∪")
        // Remove \mathrm{...}
        .replace(/\\mathrm{([^}]*)}/g, "$1")
        // Remove inline math delimiters
        .replace(/\$(.*?)\$/g, "$1")
        // Convert \frac{a}{b} to (a/b)
        .replace(/\\frac{([^}]*)}{([^}]*)}/g, "($1/$2)")
        // Convert superscripts with braces: ^{...} → ^...
        .replace(/\^{([^}]*)}/g, "^$1")
        // Convert superscripts without braces (e.g., 45^\circ, f^\prime)
        .replace(/\^([a-zA-Z0-9]+)/g, "^$1")
        // If the caret is immediately followed by ° or ′, remove the caret
        .replace(/\^(°|′)/g, "$1")
        // Convert subscripts with braces: _{...} → ...
        .replace(/_{([^}]*)}/g, "$1")
        // Convert subscripts without braces (e.g., L_2 → L2)
        .replace(/_([a-zA-Z0-9]+)/g, "$1")
        // Convert \sqrt{...} to √...
        .replace(/\\sqrt{([^}]*)}/g, "√$1")
        // Remove \left( and \right)
        .replace(/\\left\(|\\right\)/g, "")
        // Convert \textbf{...} to plain text
        .replace(/\\textbf{([^}]*)}/g, "$1")
        // Convert \ce{...} to plain text
        .replace(/\\ce{([^}]*)}/g, "$1")
        // Convert \lim_{...} to lim (...)
        .replace(/\\lim\s*_{([^}]*)}/g, "lim ($1)")
        // Convert \pi to π
        .replace(/\\pi/g, "π")
        // Convert \times to ×
        .replace(/\\times/g, "×")
        // Convert \rightarrow to →
        .replace(/\\rightarrow/g, "→")
        // Convert \infty to ∞
        .replace(/\\infty/g, "∞")
        // Remove any remaining LaTeX commands with arguments (e.g., \operatorname{...})
        .replace(/\\[a-zA-Z]+\{([^}]*)\}/g, "$1")
        // Convert LaTeX newlines (\\) to actual newlines
        .replace(/\\\\/g, "\n")
        .trim();
}

