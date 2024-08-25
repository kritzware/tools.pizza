import { editor } from "monaco-editor/esm/vs/editor/editor.api";

// All token rules can be found here
// https://code.visualstudio.com/api/references/theme-color
// https://github.com/microsoft/vscode/blob/main/src/vs/editor/standalone/common/themes.ts

// Dark Theme
export const THEME_P_DARK: editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: false,
  rules: [
    { token: "string.key.json", foreground: "#8B8B92" },
    { token: "string.value.json", foreground: "#00DCF5" },
    { token: "number", foreground: "#02E89B" },
  ],
  colors: {
    "editor.foreground": "#ffffff",
    "editor.background": "#121214",
    "editorCursor.foreground": "#ffffff",
    "editor.lineHighlightBackground": "#121214",
    "editorLineNumber.foreground": "#26262B",
    "editorLineNumber.activeForeground": "#fff",
    "editorIndentGuide.background": "#161618",
    "editorIndentGuide.activeBackground": "#1A1A1E",
    "editorBracketMatch.border": "#1A1A1E",
    "editorBracketMatch.background": "#1A1A1E",
    "editorBracketHighlight.foreground1": "#FF2962",
    "editorBracketHighlight.foreground2": "#FF2962",
    "editorBracketHighlight.foreground3": "#FF2962",
    "editorBracketHighlight.foreground4": "#FF2962",
    "editorBracketHighlight.foreground5": "#FF2962",
    "editorBracketHighlight.foreground6": "#FF2962",
    "editor.wordHighlightBackground": "#1A1A1E",
    "editorHoverWidget.background": "#1A1A1E",
    "editorHoverWidget.border": "#1A1A1E",
    "editor.foldBackground": "#1A1A1E",
    "editorGutter.foldingControlForeground": "#26262B",
  },
};

// Light Theme
export const THEME_P_LIGHT: editor.IStandaloneThemeData = {
  base: "vs",
  inherit: false,
  rules: [
    { token: "string.key.json", foreground: "#1E1E1F" },
    { token: "string.value.json", foreground: "#0A4AB8" },
    { token: "number", foreground: "#008F6D" },
  ],
  colors: {
    "editor.foreground": "#4E4E55",
    "editor.background": "#EFEFF5",
    "editorCursor.foreground": "#1E1E1F",
    "editor.lineHighlightBackground": "#EFEFF5",
    "editorLineNumber.foreground": "#D4D4D9",
    "editorLineNumber.activeForeground": "#1E1E1F",
    "editorIndentGuide.background": "#E6E6EF",
    "editorIndentGuide.activeBackground": "#E0E0EB",
    "editorBracketMatch.border": "#E0E0EB",
    "editorBracketMatch.background": "#E0E0EB",
    "editorBracketHighlight.foreground1": "#E8174F",
    "editorBracketHighlight.foreground2": "#E8174F",
    "editorBracketHighlight.foreground3": "#E8174F",
    "editorBracketHighlight.foreground4": "#E8174F",
    "editorBracketHighlight.foreground5": "#E8174F",
    "editorBracketHighlight.foreground6": "#E8174F",
    "editor.wordHighlightBackground": "#E0E0EB",
    "editorHoverWidget.background": "#E0E0EB",
    "editorHoverWidget.border": "#E0E0EB",
    "editor.foldBackground": "#E0E0EB",
    "editorGutter.foldingControlForeground": "#D4D4D9",
  },
};
