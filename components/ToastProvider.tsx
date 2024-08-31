import { createContext, useState, ReactNode, useEffect } from "react";
import useComponentVisible from "../hooks/useComponentVisible";
import { AnimatePresence, motion } from "framer-motion";

type ToastOptions = {
  error?: boolean;
};

type ToastContextType = {
  showToast: (content: ReactNode, delay?: number, options?: ToastOptions) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ToastProviderProps = {
  children: ReactNode;
  defaultDelay?: number;
};

export const ToastProvider = ({ children, defaultDelay = 1500 }: ToastProviderProps) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const [toastContent, setToastContent] = useState<ReactNode>(null);
  const [toastQueue, setToastQueue] = useState<
    Array<{ content: ReactNode, delay: number, options?: ToastOptions }>
  >([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [toastOptions, setToastOptions] = useState<ToastOptions>({});

  const showToast = (content: ReactNode, delay: number = defaultDelay, options?: ToastOptions) => {
    setToastQueue(prevQueue => [...prevQueue, { content, delay, options }]);
  };

  useEffect(() => {
    if (toastQueue.length > 0 && !isAnimating && !isComponentVisible) {
      const { content, delay, options } = toastQueue[0];
      setToastContent(content);
      setToastOptions(options || {}); // Store the options
      setIsComponentVisible(true);
      setIsAnimating(true);
  
      setTimeout(() => {
        setIsComponentVisible(false);
      }, delay);
    }
  }, [toastQueue, isAnimating, isComponentVisible, setIsComponentVisible]);

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    setToastQueue(prevQueue => prevQueue.slice(1)); // Remove the toast from the queue
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div ref={ref}>
        <AnimatePresence onExitComplete={handleAnimationComplete}>
          {isComponentVisible && (
            <motion.div
              className={`toast ${toastOptions.error ? 'error' : ''}`}
              exit={{
                y: 56,
                filter: "blur(4px)",
                transition: { type: "spring", duration: 0.56 }
              }}
              initial={{ y: 56 }}
              animate={{
                y: 0,
                filter: "blur(0px)",
                transition: { type: "spring", duration: 0.56 }
              }}
            >
              {toastContent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
