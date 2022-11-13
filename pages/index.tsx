import Head from "next/head";
import { useRef } from "react";
import Button from "../components/Button";
import Editor, { EditorMethods } from "../components/Editor";
import InfoBox from "../components/InfoBox";
import styles from "../styles/Home.module.css";

export default function Home() {
  const editorRef = useRef<EditorMethods>();

  const onFormatButton = () => editorRef.current?.formatEditorContent();
  const onCopyButton = () => editorRef.current?.copyEditorContent();

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
        <InfoBox />
        <div className={styles.actionButtons}>
          <Button icon="format" onClick={onFormatButton}>
            Format
          </Button>
          <Button icon="copy" onClick={onCopyButton}>
            Copy
          </Button>
        </div>
      </main>
    </div>
  );
}
