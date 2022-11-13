import Head from "next/head";
import Editor from "../components/Editor";
import InfoBox from "../components/InfoBox";
import styles from "../styles/Home.module.css";

export default function Home() {
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
      <main
        className={styles.main}
        // style={{ visibility: loading ? "hidden" : "visible" }}
      >
        <Editor />
        <InfoBox />

        <div className={styles["action-buttons"]}>
          <button>
            <svg
              style={{ marginRight: "10px" }}
              width="16"
              height="14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0h16v2H0V0zm0 12h16v2H0v-2zm0-4h6v2H0V8zm0-4h6v2H0V4zm12 2V3l4 4-4 4V8H8V6h4z"
                fill="#FFF"
                fill-rule="nonzero"
              />
            </svg>
            Format
            {/* <div className="formatted-check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z"
                  fill="#fff"
                />
              </svg>
            </div> */}
          </button>
          <button>
            <svg
              style={{ marginRight: "10px" }}
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1H8c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1h7zM5 4v10H1c-.6 0-1-.4-1-1V1c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v2H6c-.6 0-1 .4-1 1z"
                fill="#FFF"
                fill-rule="nonzero"
              />
            </svg>
            Copy
            {/* <div className="copied-check">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M6.61 11.89L3.5 8.78 2.44 9.84 6.61 14l8.95-8.95L14.5 4z"
                  fill="#fff"
                />
              </svg>
            </div> */}
          </button>
        </div>
      </main>
    </div>
  );
}
