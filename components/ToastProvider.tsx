import { createContext, useState, ReactNode, useEffect } from "react";
import useComponentVisible from "../hooks/useComponentVisible";
import { AnimatePresence, motion } from "framer-motion";

type ToastContextType = {
  showToast: (content: ReactNode, delay?: number) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ToastProviderProps = {
  children: ReactNode;
  defaultDelay?: number;
};

export const ToastProvider = ({ children, defaultDelay = 1500 }: ToastProviderProps) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const [toastContent, setToastContent] = useState<ReactNode>(null);
  const [toastQueue, setToastQueue] = useState<Array<{ content: ReactNode, delay: number }>>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const showToast = (content: ReactNode, delay: number = defaultDelay) => {
    setToastQueue(prevQueue => [...prevQueue, { content, delay }]);
  };

  useEffect(() => {
    if (toastQueue.length > 0 && !isAnimating && !isComponentVisible) {
      const { content, delay } = toastQueue[0];
      setToastContent(content);
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
              className="toast"
              exit={{
                y: 16,
                opacity: 0,
                filter: "blur(4px)",
                transition: { type: "spring", duration: 0.64 }
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { type: "spring", duration: 0.64 }
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