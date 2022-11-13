import MonacoEditor, { Monaco, EditorProps } from "@monaco-editor/react";
import { languages, editor } from "monaco-editor/esm/vs/editor/editor.api";
import { useMemo, useReducer, useRef, useState } from "react";
import { DATA1, DATA2 } from "../lib/sample";

const THEMES = {
  light: "vs",
  dark: "vs-dark",
};

export default function Editor() {
  const format = (text: string): string =>
    JSON.stringify(JSON.parse(text), null, 2);

  const text = DATA1;
  const [defaultText, setDefaultText] = useState(format(text));

  const [loading, setLoading] = useState(true);

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    setLoading(false);

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      // setDefaultText(format(text));
      editor.setValue(format(editor.getValue()));
      editor.setScrollTop(0);
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB, () => {
      // @ts-expect-error Not defined on type
      const currentTheme = editor._themeService._theme.themeName;
      const newTheme =
        currentTheme === THEMES.light ? THEMES.dark : THEMES.light;
      monaco.editor.setTheme(newTheme);
    });

    // console.log(editor.getSupportedActions());

    // Original json.pizza theme (based on https://github.com/kritzware/json)
    monaco.editor.defineTheme("original-pizza", {
      base: "vs-dark", // can also be vs-dark or hc-black
      inherit: true, // can also be false to completely replace the builtin rules
      rules: [
        {
          token: "comment",
          foreground: "ffa500",
          fontStyle: "italic underline",
        },
        { token: "comment.js", foreground: "008800", fontStyle: "bold" },
        { token: "comment.css", foreground: "0000ff" }, // will inherit fontStyle from `comment` above
      ],
      colors: {
        // "editor.foreground": "#000000",
        "editor.background": "#0F0F0F",
      },
    });
    // monaco.editor.setTheme("original-pizza");

    editor.focus();
  };

  const options: EditorProps["options"] = {
    minimap: { enabled: false },
    tabSize: 2,
    formatOnPaste: true,
    // codeLens: false
    // smoothScrolling: true,
    // wordWrap: "on",
    scrollBeyondLastLine: false,
    fontFamily: "Spline Sans Mono",
    fontSize: 15,
  };

  const defaultTheme = THEMES.light;

  return (
    <MonacoEditor
      height="100vh"
      defaultLanguage="json"
      defaultValue={defaultText}
      theme={defaultTheme}
      options={options}
      onMount={handleEditorDidMount}
      loading={""}
    />
  );
}
