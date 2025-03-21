import { Outlet } from "react-router-dom";
import { useFullScreen } from "@features/hooks/useFullScreen";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { isFullScreen, enterFullScreen } = useFullScreen();

  useEffect(() => {
    // Check if test has started
    const testStarted = sessionStorage.getItem("testStarted") === "true";

    // If test has started, ensure fullscreen is active
    if (testStarted && !isFullScreen) {
      // Try to re-enter fullscreen if we're not in it
      enterFullScreen();
    }
  }, [isFullScreen, enterFullScreen]);

  return <Outlet />;
};
