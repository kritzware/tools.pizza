import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import { useKeyPress } from 'ahooks';
import { useDarkMode } from 'usehooks-ts'
import { isMacOs } from 'react-device-detect'

// Components
import { Toolbar }  from "../components/Toolbar";
import { TopButtons }  from "../components/TopButtons";
import { Button } from "../components/Button";
import { KeyboardPlus } from "../components/KeyboardPlus";
import { KeyboardShortcut } from "../components/KeyboardShortcut";
import Overlay from "../components/Overlay";

// Editor
import Editor, { EditorMethods } from "../components/Editor";

// ClientOnly
import ClientOnly from "../components/ClientOnly";

// Export
export default function Home() {
  const editorRef = useRef<EditorMethods>(null);
  const editorElementRef = useRef<HTMLDivElement>(null);

  const [showInfo, setShowInfo] = useState(false);
  const { isDarkMode, toggle } = useDarkMode();

  // Set color mode
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Button functions
  const onFormatButton = () => {
    editorRef.current?.formatEditorContent();
  }
  const onCopyButton = () => {
    editorRef.current?.copyEditorContent();
  }
  const onShareableLinkButton = () => {
    editorRef.current?.getShareableLink();
  }
  const onInfoButton = () => {
    setShowInfo((showInfo) => !showInfo);
  };
  const onThemeButton = () => {
    // Sets Editor color mode
    editorRef.current?.toggleEditorTheme();

    // Sets external color mode
    toggle();

    // Applies classes to body
    if (isDarkMode) {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
  };

  // Keyboard Shortcuts
  useKeyPress(isMacOs ? 'meta.u' : 'ctrl.u', () => {
    onInfoButton();
  });
  useKeyPress(isMacOs ? 'meta.j' : 'ctrl.j', () => {
    onCopyButton();
  });
  useKeyPress(isMacOs ? 'meta.k' : 'ctrl.k', () => {
    onShareableLinkButton();
  });
  useKeyPress(isMacOs ? 'meta.b' : 'ctrl.b', () => {
    onThemeButton();
  });
  useKeyPress(isMacOs ? 'meta.enter' : 'ctrl.enter', () => {
    onFormatButton();
  });

  // Template
  return (
    <div className="container">
      <Head>
        <title>JSON.pizza</title>
        <meta
          name="description"
          content="Prettify, inspect and share your JSON data."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main ref={editorElementRef}>
        <ClientOnly>
          <Editor ref={editorRef} onToggleInformation={onInfoButton} onToggleTheme={onThemeButton} darkMode={isDarkMode} />
          {showInfo && <Overlay darkMode={isDarkMode} />}
          <TopButtons>
            <Button onClick={onInfoButton} className={showInfo ? "active" : ""} color="secondary" hasShortcut>
              Information
              <KeyboardShortcut color="secondary">
                {isMacOs ? '⌘' : 'Ctrl'} <KeyboardPlus/> U
              </KeyboardShortcut>
            </Button>
              <Button onClick={onThemeButton} color="secondary" hasShortcut>
                {isDarkMode ? 'Dark' : 'Light'} Mode
                <KeyboardShortcut color="secondary">
                  {isMacOs ? '⌘' : 'Ctrl'} <KeyboardPlus/> B
                </KeyboardShortcut>
              </Button>
          </TopButtons>
          <Toolbar>
            <Button onClick={onFormatButton} hasShortcut>
              Format JSON
              <KeyboardShortcut>
                {isMacOs ? '⌘' : 'Ctrl'} <KeyboardPlus/> Enter
              </KeyboardShortcut>
            </Button>
            <Button onClick={onCopyButton} hasShortcut>
              Copy JSON
              <KeyboardShortcut>
                {isMacOs ? '⌘' : 'Ctrl'} <KeyboardPlus/> J
              </KeyboardShortcut>
            </Button>
            <Button onClick={onShareableLinkButton} hasShortcut>
              Shareable Link
              <KeyboardShortcut>
                {isMacOs ? '⌘' : 'Ctrl'} <KeyboardPlus/> K
              </KeyboardShortcut>
            </Button>
          </Toolbar>
        </ClientOnly>
      </main>
    </div>
  );
}
