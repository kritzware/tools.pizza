import useComponentVisible from "../hooks/useComponentVisible";
import { AnimatePresence, motion } from "framer-motion";
import { isMacOs } from 'react-device-detect'

// Components
import { Button } from "../components/Button";
import { KeyboardPlus } from "../components/KeyboardPlus";
import { KeyboardShortcut } from "../components/KeyboardShortcut";
import { InlineTag } from "../components/InlineTag";

type OverlayProps = {
  darkMode: boolean;
};

export default function Overlay({ darkMode }: OverlayProps) {
  const { ref, isComponentVisible } = useComponentVisible(true);
  
  function openGitHubLink() {
    window.open("https://github.com/kritzware/tools.pizza", "_blank");
  }

  return (
    <div ref={ref}>
      <AnimatePresence>
        {isComponentVisible && (
          <motion.div
            className={`overlay ${darkMode ? 'dark' : 'light'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.19, 1, 0.22, 1] }}
          >
            <h3>A simple, keyboard-focused JSON formatter.</h3>
            <div className="lines">
              <div className="line">
                <span>To format your JSON blob, paste it into the editor and press</span>
                <KeyboardShortcut color="button">
                  {isMacOs ? '⌘' : 'Ctrl'} <KeyboardPlus /> Enter
                </KeyboardShortcut>
              </div>
              <div className="line">
                <span>To copy your formatted JSON blob to your clipboard, press</span>
                <KeyboardShortcut color="button">
                  {isMacOs ? '⌘' : 'Ctrl'} <KeyboardPlus /> J
                </KeyboardShortcut>
              </div>
              <div className="line">
                <span>To generate a shareable, public link to your JSON blob, press</span>
                <KeyboardShortcut color="button">
                  {isMacOs ? '⌘' : 'Ctrl'} <KeyboardPlus /> K
                </KeyboardShortcut>
              </div>
              <div className="line">
                <span>To toggle the information overlay (for links and shortcuts) press</span>
                <KeyboardShortcut color="button">
                  {isMacOs ? '⌘' : 'Ctrl'} <KeyboardPlus /> U
                </KeyboardShortcut>
              </div>
              <div className="line">
                <span>To switch between <InlineTag>Light</InlineTag> and <InlineTag>Dark</InlineTag> color modes, press</span>
                <KeyboardShortcut color="button">
                  {isMacOs ? '⌘' : 'Ctrl'} <KeyboardPlus /> B
                </KeyboardShortcut>
              </div>
              <div className="line">
                <span>If your JSON blob fails to parse, check the console for errors.</span>
              </div>
            </div>
            <Button color="secondary" onClick={openGitHubLink}>View Source Code on Github</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
