import MonacoEditor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor/esm/vs/editor/editor.api";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useRouter } from "next/router";
import { DATA1 } from "../lib/sample";
import { THEME_P_DARK, THEME_P_LIGHT } from "../lib/themes";
import { useToast } from "../hooks/useToast";

const THEMES = {
  light: "p-light",
  dark: "p-dark",
};

export type EditorMethods = {
  formatEditorContent: () => void;
  copyEditorContent: () => void;
  toggleTheme: () => void;
  toggleEditorTheme: () => void;
  getShareableLink: () => void;
};

type EditorProps = {
  onToggleInformation?: () => void;
  onToggleTheme?: () => void;
  darkMode?: boolean;
};

const Editor = React.forwardRef<EditorMethods, EditorProps>(
  ({ onToggleInformation, onToggleTheme, darkMode }, ref) => {
  const text = DATA1;

  const format = (
    text: string, 
    showToast?: (message: string, delay?: number, options?: { error?: boolean }) => void
  ): string => {
    try {
      const parsed = JSON.parse(text);
      if (showToast) {
        showToast("JSON formatted successfully");
      }
      return JSON.stringify(parsed, null, 2);
    } catch (error) {
      console.error("Error formatting JSON:", error);
      if (showToast) {
        showToast("Error formatting JSON", 1500, { error: true });
      }
      return text;
    }
  };

  const [defaultText, setDefaultText] = useState(format(text));
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(THEMES.light);

  const router = useRouter();

  const editorRef = useRef<editor.IStandaloneCodeEditor>();
  const monacoRef = useRef<Monaco>();

  const showToast = useToast();

  const formatEditorContent = () => {
    if (typeof editorRef?.current === "undefined") throw new Error("Editor is not available");
    const formattedContent = format(editorRef.current.getValue(), showToast);
    editorRef.current.setValue(formattedContent);
    editorRef.current.setScrollTop(0);
    window.localStorage.setItem("pizza-format-cache", formattedContent);
  };

  const formatEditorContentNoToast = () => {
    if (typeof editorRef?.current === "undefined") throw new Error("Editor is not available");
    const formattedContent = format(editorRef.current.getValue());
    editorRef.current.setValue(formattedContent);
    editorRef.current.setScrollTop(0);
    window.localStorage.setItem("pizza-format-cache", formattedContent);
  };

  const copyEditorContent = () => {
    if (typeof editorRef?.current === "undefined") return;
    const content = editorRef.current.getValue();
    navigator.clipboard.writeText(content);
    showToast("JSON copied to clipboard");
  };

  const toggleTheme = () => {
    if (onToggleTheme) {
      onToggleTheme();
    }
  };

  const toggleInformation = () => {
    if (onToggleInformation) {
      onToggleInformation();
    }
  };

  const toggleEditorTheme = () => {
    // @ts-expect-error Not defined on type
    const currentTheme = editorRef.current._themeService._theme.themeName;

    if (
      typeof editorRef.current === "undefined" ||
      typeof monacoRef.current === "undefined"
    )
      return;
    if (currentTheme === THEMES.dark) {
      monacoRef.current.editor.setTheme(THEMES.light);
    } else {
      monacoRef.current.editor.setTheme(THEMES.dark);
    }
  }

  const getShareableLink = () => {
    if (typeof editorRef?.current === "undefined") return;
    const content = editorRef.current.getValue();
    const minifiedData = content.replaceAll(/\s+/g, "");
    const b64Data = Buffer.from(minifiedData).toString("base64");

    const domain =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : `https://${process.env.NEXT_PUBLIC_URL}`;

    const url = new URL(domain as string);
    url.searchParams.append("data", b64Data);

    navigator.clipboard.writeText(url.toString());
    showToast("Link copied to clipboard");
  };

  useImperativeHandle(
    ref,
    () => ({ formatEditorContent, copyEditorContent, toggleTheme, toggleInformation, toggleEditorTheme, getShareableLink }),
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

    // Key commands

    // Format
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      formatEditorContent
    );
    // Copy JSON
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ,
      copyEditorContent
    );
    // Shareable Link
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK,
      getShareableLink
    );
    // Toggle Theme
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB, toggleTheme);
    // Toggle Information
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyU, toggleInformation);

    // Load custom themes
    monaco.editor.defineTheme(THEMES.dark, THEME_P_DARK);
    monaco.editor.defineTheme(THEMES.light, THEME_P_LIGHT);

    // Set custom theme
    if (darkMode) {
      monaco.editor.setTheme("p-dark");
    } else {
      monaco.editor.setTheme("p-light");
    }

    // Format content
    // Handles shareableLink formatting
    formatEditorContentNoToast();

    // Focus editor
    editor.focus();
  };

  // Editor options
  const options: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    tabSize: 2,
    disableMonospaceOptimizations: true,
    overviewRulerLanes: 0,
    scrollbar: { verticalScrollbarSize: 4, horizontalScrollbarSize: 4, useShadows: false },
    scrollBeyondLastLine: false,
    autoDetectHighContrast: false,
    codeLens: false,
    find: {
      addExtraSpaceOnTop: false,
    },
    fontFamily: "Aeonik Mono VF",
    fontSize: 15,
  };

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
