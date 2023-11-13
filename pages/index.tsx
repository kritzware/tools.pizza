import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/Button";
import Editor, { EditorMethods } from "../components/Editor";
import InfoBox from "../components/InfoBox";
import styles from "../styles/Home.module.css";

const SEEN_INFO = "tp:seen-info";

export default function Home() {
  const editorRef = useRef<EditorMethods>();

  const onFormatButton = () => editorRef.current?.formatEditorContent();
  const onCopyButton = () => editorRef.current?.copyEditorContent();
  const onThemeButton = () => editorRef.current?.toggleTheme();

  const [seenInfo, setSeenInfo] = useState(false);

  useEffect(() => {
    setSeenInfo(!!window.localStorage.getItem(SEEN_INFO));
  }, []);

  const onHideInfo = () => window.localStorage.setItem(SEEN_INFO, "true");

  return (
    <div className={styles.container}>
      <Head>
        <title>JSON.pizza — Format</title>
        <meta
          name="description"
          content="Format — Prettify, inspect and share your JSON data"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Editor ref={editorRef} />
        {!seenInfo && <InfoBox onHide={onHideInfo} />}
        <div className={styles.actionButtons}>
          <Button onClick={onFormatButton}>
            <svg
              style={{ marginRight: 10 }}
              width="16"
              height="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0h16v2H0V0zm0 12h16v2H0v-2zm0-4h6v2H0V8zm0-4h6v2H0V4zm12 2V3l4 4-4 4V8H8V6h4z"
                fill="#FFF"
                fillRule="nonzero"
              />
            </svg>
            Format
          </Button>
          <Button onClick={onCopyButton}>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 5c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1H8c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1h7zM5 4v10H1c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v2H6c-.6 0-1 .4-1 1z"
                fill="#FFF"
                fillRule="nonzero"
              />
            </svg>
          </Button>
          <Button onClick={onThemeButton}>
            <span style={{ fontSize: 21 }}>🌞</span>
          </Button>
        </div>
      </main>
    </div>
  );
}
