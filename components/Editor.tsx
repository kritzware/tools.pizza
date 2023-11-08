import MonacoEditor, { Monaco, EditorProps } from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useRouter } from "next/router";
import { DATA1, DATA2 } from "../lib/sample";
import { THEME_ORIGINAL_PIZZA } from "../lib/themes";

const THEMES = {
  light: "vs",
  dark: "vs-dark",
  original: "original-pizza",
};

const format = (text: string): string =>
  JSON.stringify(JSON.parse(text), null, 2);

export type EditorMethods = typeof Editor & {
  formatEditorContent: () => void;
  copyEditorContent: () => void;
  toggleTheme: () => void;
};

const Editor = React.forwardRef((props, ref) => {
  const text = DATA1;

  const [defaultText, setDefaultText] = useState(format(text));
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(THEMES.light);

  const router = useRouter();

  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const monacoRef = useRef<Monaco>();

  const formatEditorContent = () => {
    if (typeof editorRef?.current === "undefined") return;
    editorRef.current.setValue(format(editorRef.current.getValue()));
    editorRef.current.setScrollTop(0);
    window.localStorage.setItem(
      "pizza-format-cache",
      editorRef.current.getValue()
    );
  };

  const copyEditorContent = () => {
    if (typeof editorRef?.current === "undefined") return;
    const content = editorRef.current.getValue();
    navigator.clipboard.writeText(content);
  };

  const toggleTheme = () => {
    if (
      typeof editorRef?.current === "undefined" ||
      typeof monacoRef?.current === "undefined"
    )
      return;
    // @ts-expect-error Not defined on type
    const currentTheme = editorRef.current._themeService._theme.themeName;
    const newTheme = currentTheme === THEMES.light ? THEMES.dark : THEMES.light;
    monacoRef.current.editor.setTheme(newTheme);
    setTheme(newTheme);
  };

  const getShareableLink = () => {
    if (typeof editorRef?.current === "undefined") return;
    const content = editorRef.current.getValue();
    const minifiedData = content.replaceAll(/\s+/g, "");
    const b64Data = Buffer.from(minifiedData).toString("base64");

    const domain =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

    const url = new URL(domain as string);
    url.searchParams.append("data", b64Data);

    navigator.clipboard.writeText(url.toString());
    console.log("shareable url:", url.toString());
  };

  useImperativeHandle(
    ref,
    () => ({ formatEditorContent, copyEditorContent, toggleTheme, theme }),
    []
  );

  useEffect(() => {
    if (router.query?.data) {
      const queryData = Buffer.from(router.query.data as string, "base64");
      if (queryData) setDefaultText(queryData.toString());
    } else {
      const cachedData = window.localStorage.getItem("pizza-format-cache");
      if (cachedData) setDefaultText(cachedData);
    }
  }, [router.query]);

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    setLoading(false);
    editorRef.current = editor;
    monacoRef.current = monaco;

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
        setTheme(newTheme);
      });

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      formatEditorContent
    );

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB, toggleTheme);

    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyL,
      getShareableLink
    );

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
  // const defaultTheme = THEMES.light;

  return (
    <MonacoEditor
      height="100vh"
      defaultLanguage="json"
      defaultValue={defaultText}
      theme={theme}
      options={options}
      onMount={handleEditorDidMount}
      loading={""}
    />
  );
});

Editor.displayName = "Editor";

export default Editor;
