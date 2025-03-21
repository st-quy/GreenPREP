import { createContext, useContext, useEffect } from "react";
import { useFullScreen } from "../hooks/useFullScreen";

// Create context
const FullScreenContext = createContext(null);

/**
 * Provider component that makes fullscreen functionality available throughout the app
 * without needing to call the hook in every component
 */
export function FullScreenProvider({ children }) {
  // Call the hook once at the top level
  const fullScreenState = useFullScreen();
  const { isFullScreen, enterFullScreen, testActive } = fullScreenState;

  // Enforce fullscreen globally when test is active
  useEffect(() => {
    // If test is active but not in fullscreen, enter fullscreen
    if (testActive && !isFullScreen) {
      enterFullScreen();
    }
  }, [testActive, isFullScreen]); // Removed enterFullScreen from dependencies

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
