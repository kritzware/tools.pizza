// Globals
import "../styles/globals.css";

// Fonts
import "../styles/fonts/inter-variable.css";
import "../styles/fonts/aeonik-mono-vf.css";

// Components
import "../styles/components/buttons.css";
import "../styles/components/inline-tag.css";
import "../styles/components/keyboard-shortcut.css";
import "../styles/components/overlay.css";
import "../styles/components/toast.css";
import "../styles/components/toolbar.css";
import "../styles/components/top-buttons.css";

// App
import type { AppProps } from "next/app";

// ToastProvider
import { ToastProvider } from "../components/ToastProvider";

// Export
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}
