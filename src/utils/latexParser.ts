// utils/latexParser.ts

export function cleanLatex(text: string): string {
    return text
      .replace(/\\mathrm{([^}]*)}/g, "$1") // Remove \mathrm{}
      .replace(/\$(.*?)\$/g, "$1") // Remove inline math $
      .replace(/\\frac{([^}]*)}{([^}]*)}/g, "($1/$2)") // Convert \frac{a}{b} → (a/b)
      .replace(/\^{([^}]*)}/g, "^$1") // Convert ^{2} → ^2
      .replace(/\\sqrt{([^}]*)}/g, "√$1") // Convert \sqrt{2} → √2
      .replace(/\\left\(|\\right\)/g, "") // Remove \left( and \right)
      .replace(/\\textbf{([^}]*)}/g, "$1") // Convert \textbf{text} → text
      .replace(/\\ce{([^}]*)}/g, "$1") // Convert chemical formula \ce{H2O} → H2O
      .replace(/\\lim\s*_{([^}]*)}/g, "lim ($1)") // Convert \lim_{x→0} → lim (x→0)
      .replace(/\\pi/g, "π") // Convert \pi → π
      .replace(/\\times/g, "×") // Convert \times → ×
      .replace(/\\rightarrow/g, "→") // Convert \rightarrow → →
      .replace(/\\infty/g, "∞") // Convert \infty → ∞
      .replace(/\\w+[{]([^}]*)[}]/g, "$1") // Remove unknown LaTeX commands
      .replace(/\\\\/g, "\n") // Convert LaTeX newlines
      .trim();
  }
  