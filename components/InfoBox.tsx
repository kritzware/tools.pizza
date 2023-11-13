import { useEffect } from "react";
import useComponentVisible from "../hooks/useComponentVisible";
import styles from "../styles/Home.module.css";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  onHide: () => void;
};

export default function InfoBox(props: Props) {
  const { ref, isComponentVisible } = useComponentVisible(true);

  useEffect(() => {
    if (!isComponentVisible) props.onHide();
  }, [props, isComponentVisible]);

  return (
    <div ref={ref}>
      <AnimatePresence>
        {isComponentVisible && (
          <motion.div
            className={styles.infoBox}
            initial={{ opacity: 0, translateY: 16 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: 16 }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          >
            <b>How to use:</b> Paste your JSON in the editor and press{" "}
            <b>Format</b> (Cmd+Enter).
            <br />
            <b>Errors:</b> Check the console for errors if your JSON fails to
            parse.
            <br />
            <b>Themes:</b> Toggle between dark/light themes by pressing Cmd+B.
            <br />
            <button className={styles.pill}>new! 🎉</button>
            <b>Sharing:</b> Copy a shareable URL to your clipboard by pressing
            Cmd+L.
            <br />
            <b>Privacy:</b> Your data will not be stored or shared with any
            third parties.
            <br />
            <b>Source:</b> View the source code on{" "}
            <a
              href="https://github.com/kritzware/tools.pizza"
              target="_blank"
              rel="noreferrer"
            >
              GitHub.
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
