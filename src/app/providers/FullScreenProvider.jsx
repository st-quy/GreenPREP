import { createContext, useContext, useEffect } from "react";
import { useFullScreen } from "@app/providers/store/useFullScreen";

const FullScreenContext = createContext(null);

// Provider component that makes fullscreen functionality available throughout the app
export function FullScreenProvider({ children }) {
  const fullScreenState = useFullScreen();
  const { isFullScreen, enterFullScreen, testActive } = fullScreenState;

  // Enforce fullscreen globally when test is active
  useEffect(() => {
    if (testActive && !isFullScreen) {
      enterFullScreen();
    }
  }, [testActive, isFullScreen]);

  return (
    <FullScreenContext.Provider value={fullScreenState}>
      {children}
    </FullScreenContext.Provider>
  );
}

// Custom hook to use the fullscreen context
export function useFullScreenContext() {
  const context = useContext(FullScreenContext);
  if (!context) {
    throw new Error(
      "useFullScreenContext must be used within a FullScreenProvider"
    );
  }
  return context;
}
