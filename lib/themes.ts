import { editor } from "monaco-editor/esm/vs/editor/editor.api";

// All token rules can be found here
// https://github.com/microsoft/vscode/blob/main/src/vs/editor/standalone/common/themes.ts

// Original json.pizza theme (based on https://github.com/kritzware/json)
export const THEME_ORIGINAL_PIZZA: editor.IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "string.key.json", foreground: "#FFCC00" },
    { token: "string.value.json", foreground: "#66FF00" },
    { token: "number", foreground: "#99CC99" },
  ],
  colors: {
    "editor.background": "#0F0F0F",
  },
};
