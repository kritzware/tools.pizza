import MonacoEditor, { Monaco, EditorProps } from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import React, { useImperativeHandle, useRef, useState } from "react";
import { DATA1, DATA2 } from "../lib/sample";
import { THEME_ORIGINAL_PIZZA } from "../lib/themes";

const THEMES = {
  light: "vs",
  dark: "vs-dark",
  original: "original-pizza",
};

const format = (text: string): string =>
  JSON.stringify(JSON.parse(text), null, 2);

export type EditorMethods = typeof Editor & { formatEditorContent: () => void };

const Editor = React.forwardRef((props, ref) => {
  const text = DATA1;

  const [defaultText, setDefaultText] = useState(format(text));
  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const [loading, setLoading] = useState(true);

  const formatEditorContent = () => {
    if (typeof editorRef?.current === "undefined") return;
    editorRef.current.setValue(format(editorRef.current.getValue()));
    editorRef.current.setScrollTop(0);
  };
  useImperativeHandle(ref, () => ({ formatEditorContent }), []);

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    setLoading(false);
    editorRef.current = editor;

    // Use system theme
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      monaco.editor.setTheme(THEMES.dark);
    }

    // Watch for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        const newTheme = event.matches ? THEMES.dark : THEMES.light;
        monaco.editor.setTheme(newTheme);
      });

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      formatEditorContent
    );

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB, () => {
      // @ts-expect-error Not defined on type
      const currentTheme = editor._themeService._theme.themeName;
      const newTheme =
        currentTheme === THEMES.light ? THEMES.dark : THEMES.light;
      monaco.editor.setTheme(newTheme);
    });

    // Load custom themes
    monaco.editor.defineTheme(THEMES.original, THEME_ORIGINAL_PIZZA);

    // Set custom theme
    // monaco.editor.setTheme("original-pizza");

    editor.focus();
  };

  // Editor options
  const options: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    tabSize: 2,
    // formatOnPaste: true,
    // codeLens: false
    // smoothScrolling: true,
    // wordWrap: "on",
    scrollBeyondLastLine: false,
    autoDetectHighContrast: false,
    codeLens: false,
    find: {
      addExtraSpaceOnTop: false,
    },
    fontFamily: "Spline Sans Mono",
    fontSize: 15,
  };

  // Set default theme
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
});

Editor.displayName = "Editor";

export default Editor;
