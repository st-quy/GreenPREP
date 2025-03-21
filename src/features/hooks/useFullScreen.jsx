import { useState, useEffect, useCallback } from "react";
import { message, Modal } from "antd";

export function useFullScreen() {
  // Track if the application is currently in fullscreen mode
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Store browser information and capabilities
  const [browserInfo, setBrowserInfo] = useState(null);

  // Track if browser detection has failed
  const [detectionFailed, setDetectionFailed] = useState(false);

  // Track if test is active
  const [testActive, setTestActive] = useState(false);

  // Detect browser and check fullscreen support
  useEffect(() => {
    const detectBrowser = () => {
      try {
        const userAgent = navigator.userAgent;
        let browserName = "Unknown";
        let browserVersion = "Unknown";

        // Detect Chrome and Chromium-based browsers (including Opera GX)
        if (
          userAgent.match(/chrome|chromium|crios/i) ||
          userAgent.match(/opr\//i)
        ) {
          // Check specifically for Opera
          if (userAgent.match(/opr\//i)) {
            browserName = "Opera";
            const match = userAgent.match(/opr\/(\d+)/);
            if (match) browserVersion = match[1];
          } else {
            browserName = "Chrome";
            const match = userAgent.match(/(?:chrome|chromium|crios)\/(\d+)/);
            if (match) browserVersion = match[1];
          }
        }
        // Detect Firefox browser from user agent
        else if (userAgent.match(/firefox|fxios/i)) {
          browserName = "Firefox";
          const match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
          if (match) browserVersion = match[1];
        }
        // Detect Safari browser from user agent (must check after Chrome)
        else if (
          userAgent.match(/safari/i) &&
          !userAgent.match(/chrome|chromium|crios/i)
        ) {
          browserName = "Safari";
          const match = userAgent.match(/version\/(\d+)/);
          if (match) browserVersion = match[1];
        }
        // Detect Edge browser from user agent
        else if (userAgent.match(/edg/i)) {
          browserName = "Edge";
          const match = userAgent.match(/edg\/(\d+)/);
          if (match) browserVersion = match[1];
        }

        // Check if fullscreen is supported using standard or vendor-prefixed methods
        const docEl = document.documentElement;
        const supportsFullScreen =
          docEl.requestFullscreen !== undefined ||
          "webkitRequestFullscreen" in docEl ||
          "mozRequestFullScreen" in docEl ||
          "msRequestFullscreen" in docEl;

        return {
          name: browserName,
          version: browserVersion,
          supportsFullScreen,
        };
      } catch (err) {
        // If browser detection fails, set the detection failed flag
        console.error("Browser detection failed:", err);
        setDetectionFailed(true);

        // Return a fallback with conservative assumptions
        return {
          name: "Unknown",
          version: "Unknown",
          supportsFullScreen: false,
        };
      }
    };

    setBrowserInfo(detectBrowser());

    // Check if test is active
    const isTestActive = sessionStorage.getItem("testStarted") === "true";
    setTestActive(isTestActive);

    // Check if we need to restore fullscreen after navigation
    const storedFullscreenState = sessionStorage.getItem(
      "testFullscreenActive"
    );

    // Only try to re-enter fullscreen if we were previously in it but aren't currently
    if (storedFullscreenState === "true" && !document.fullscreenElement) {
      // Use a shorter timeout for better performance (within 1 second)
      setTimeout(() => {
        enterFullScreen();
      }, 300);
    }
  }, []);

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullScreenChange = () => {
      // Check for fullscreen element using standard or vendor-prefixed properties
      const isCurrentlyFullScreen = Boolean(
        document.fullscreenElement ||
          document["webkitFullscreenElement"] ||
          document["mozFullScreenElement"] ||
          document["msFullscreenElement"]
      );

      // Update state and sessionStorage when fullscreen status changes
      setIsFullScreen(isCurrentlyFullScreen);
      sessionStorage.setItem(
        "testFullscreenActive",
        isCurrentlyFullScreen.toString()
      );

      // If user exited fullscreen and test is active, try to force back into fullscreen
      if (!isCurrentlyFullScreen && testActive) {
        // Show warning message
        message.warning({
          content:
            "Fullscreen mode is required for this test. Returning to fullscreen mode...",
          duration: 3,
        });

        // Try to re-enter fullscreen immediately
        setTimeout(() => {
          enterFullScreen();
        }, 300);
      }
    };

    // Add event listeners for all browser-specific fullscreen change events
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange
      );
    };
  }, [isFullScreen, testActive]);

  // Add keyboard event listener to prevent exiting fullscreen with keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only prevent keys if test is active
      if (!testActive) return;

      // Prevent F11 key (fullscreen toggle)
      if (e.key === "F11") {
        e.preventDefault();
        return false;
      }

      // Prevent Escape key (exits fullscreen)
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();

        // Show warning modal
        Modal.warning({
          title: "Fullscreen Required",
          content:
            "You must remain in fullscreen mode during the test. Please do not attempt to exit fullscreen.",
          okText: "Continue Test",
          maskClosable: false,
          onOk: () => {
            // Try to re-enter fullscreen
            enterFullScreen();
          },
        });

        return false;
      }

      // detected Alt+Tab
      if (e.altKey && e.key === "Tab") {
        // We can't prevent Alt+Tab because Alt+Tab is handled outside the browser entirely, by the Windows DWM.
        // We showing a warning instead, But this will change according to the polices
        Modal.warning({
          title: "Warning",
          content:
            "Switching applications during the test is not allowed. Please remain in the test window.",
          okText: "Continue Test",
        });
      }

      // Ctrl+Tab and Ctrl+Shift+Tab (switch between tabs)
      if (e.ctrlKey && e.key === "Tab") {
        e.preventDefault();

        Modal.warning({
          title: "Tab Switching Not Allowed",
          content: "Switching tabs during the test is not allowed.",
          okText: "Continue Test",
        });

        return false;
      }

      // Ctrl+1 through Ctrl+9 (switch to specific tabs)
      if (
        e.ctrlKey &&
        !e.altKey &&
        !e.shiftKey &&
        !isNaN(Number.parseInt(e.key)) &&
        Number.parseInt(e.key) >= 1 &&
        Number.parseInt(e.key) <= 9
      ) {
        e.preventDefault();

        Modal.warning({
          title: "Tab Switching Not Allowed",
          content: "Switching tabs during the test is not allowed.",
          okText: "Continue Test",
        });

        return false;
      }

      // Ctrl+T (new tab)
      if (e.ctrlKey && e.key === "t") {
        e.preventDefault();

        Modal.warning({
          title: "New Tab Not Allowed",
          content: "Opening new tabs during the test is not allowed.",
          okText: "Continue Test",
        });

        return false;
      }

      // Ctrl+N (new window)
      if (e.ctrlKey && e.key === "n") {
        e.preventDefault();

        Modal.warning({
          title: "New Window Not Allowed",
          content: "Opening new windows during the test is not allowed.",
          okText: "Continue Test",
        });

        return false;
      }

      // Alt+F4 (close window)
      if (e.altKey && e.key === "F4") {
        e.preventDefault();

        Modal.warning({
          title: "Closing Window Not Allowed",
          content: "Closing the window during the test is not allowed.",
          okText: "Continue Test",
        });

        return false;
      }

      // Ctrl+W (close tab)
      if (e.ctrlKey && e.key === "w") {
        e.preventDefault();

        Modal.warning({
          title: "Closing Tab Not Allowed",
          content: "Closing the tab during the test is not allowed.",
          okText: "Continue Test",
        });

        return false;
      }

      // Alt+Left/Right (browser back/forward)
      if (e.altKey && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();

        Modal.warning({
          title: "Browser Navigation Not Allowed",
          content:
            "Using browser back/forward navigation during the test is not allowed.",
          okText: "Continue Test",
        });

        return false;
      }

      // Prevent Ctrl+C (copy)
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();

        Modal.warning({
          title: "Copy Not Allowed",
          content: "Copying content during the test is not allowed.",
          okText: "Continue Test",
        });

        return false;
      }

      // Prevent Ctrl+V (paste)
      if (e.ctrlKey && e.key === "v") {
        e.preventDefault();

        Modal.warning({
          title: "Paste Not Allowed",
          content: "Pasting content during the test is not allowed.",
          okText: "Continue Test",
        });

        return false;
      }
    };

    // Add event listener at the top level
    window.addEventListener("keydown", handleKeyDown, true);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [testActive]);

  // Prevent right-click context menu
  useEffect(() => {
    const handleContextMenu = (e) => {
      if (testActive) {
        e.preventDefault();

        message.warning({
          content: "Right-click menu is disabled during the test.",
          duration: 3,
        });

        return false;
      }
    };

    // Add event listener
    document.addEventListener("contextmenu", handleContextMenu);

    // Clean up
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [testActive]);

  // Add beforeunload event to prevent page refresh or closing
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (testActive) {
        // Standard way to show a confirmation dialog before leaving
        e.preventDefault();

        // Chrome requires returnValue to be set
        e.returnValue =
          "Are you sure you want to leave the test? Your progress may be lost.";

        // Return a string (legacy method, some browsers still use this)
        return "Are you sure you want to leave the test? Your progress may be lost.";
      }
    };

    // Add event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [testActive]);

  // Function to enter fullscreen
  const enterFullScreen = useCallback(() => {
    // If already in fullscreen, don't try to enter it again
    if (
      document.fullscreenElement ||
      document["webkitFullscreenElement"] ||
      document["mozFullScreenElement"] ||
      document["msFullscreenElement"]
    ) {
      return true;
    }

    // If browser detection failed, show error message
    if (detectionFailed) {
      message.error({
        content:
          "Unable to detect browser capabilities. Please try using a modern browser like Chrome, Firefox, or Edge.",
        duration: 7,
      });
      return false;
    }

    // If browser doesn't support fullscreen, show error message
    if (!browserInfo?.supportsFullScreen) {
      message.error({
        content: `Your browser (${browserInfo?.name} ${browserInfo?.version}) doesn't support full-screen mode. Please use a modern browser like Chrome, Firefox, or Edge.`,
        duration: 7,
      });
      return false;
    }

    const docEl = document.documentElement;

    try {
      // Create a promise that will resolve when fullscreen is entered or reject if declined
      let fullscreenPromise;

      // Try standard fullscreen method first (most modern browsers)
      if (docEl.requestFullscreen) {
        fullscreenPromise = docEl.requestFullscreen();
      }
      // Try webkit prefix for Safari and older Chrome
      else if (docEl["webkitRequestFullscreen"]) {
        fullscreenPromise = docEl["webkitRequestFullscreen"]();
      }
      // Try moz prefix for older Firefox
      else if (docEl["mozRequestFullScreen"]) {
        fullscreenPromise = docEl["mozRequestFullScreen"]();
      }
      // Try ms prefix for older IE/Edge
      else if (docEl["msRequestFullscreen"]) {
        fullscreenPromise = docEl["msRequestFullscreen"]();
      }

      // Handle promise if available (modern browsers)
      if (fullscreenPromise && fullscreenPromise.then) {
        fullscreenPromise.catch((err) => {
          console.error("Fullscreen request was rejected:", err);

          // Show error message
          message.error({
            content:
              "You must allow full-screen mode to take the test. Please refresh the page and try again.",
            duration: 10,
          });
        });
      }

      // Store fullscreen state in sessionStorage for persistence across pages
      sessionStorage.setItem("testFullscreenActive", "true");
      return true;
    } catch (err) {
      // If entering fullscreen fails, show error message
      console.error("Failed to enter fullscreen:", err);

      message.error({
        content:
          "Failed to enter full-screen mode. You must allow full-screen mode to take the test. Please refresh the page and try again.",
        duration: 10,
      });
      return false;
    }
  }, [browserInfo, detectionFailed]);

  // Function to exit fullscreen
  const exitFullScreen = useCallback(() => {
    try {
      // Only try to exit if we're actually in fullscreen
      if (
        !document.fullscreenElement &&
        !document["webkitFullscreenElement"] &&
        !document["mozFullScreenElement"] &&
        !document["msFullscreenElement"]
      ) {
        return;
      }

      // Try standard exit fullscreen method first (most modern browsers)
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      // Try webkit prefix for Safari and older Chrome
      else if (document["webkitExitFullscreen"]) {
        document["webkitExitFullscreen"]();
      }
      // Try moz prefix for older Firefox
      else if (document["mozCancelFullScreen"]) {
        document["mozCancelFullScreen"]();
      }
      // Try ms prefix for older IE/Edge
      else if (document["msExitFullscreen"]) {
        document["msExitFullscreen"]();
      }

      // Update sessionStorage when exiting fullscreen
      sessionStorage.setItem("testFullscreenActive", "false");
    } catch (err) {
      console.error("Error exiting fullscreen:", err);
    }
  }, []);

  // Function to start test in fullscreen
  const startTestInFullScreen = useCallback(() => {
    // If browser detection is still in progress
    if (!browserInfo) {
      message.loading("Checking browser compatibility...");
      return false;
    }

    // If browser detection failed, show fallback message
    if (detectionFailed) {
      message.warning({
        content:
          "Unable to verify browser compatibility. The test will continue, but fullscreen mode may not work properly.",
        duration: 7,
      });
      // Try entering fullscreen anyway as a fallback
      try {
        document.documentElement.requestFullscreen().catch((err) => {
          console.log("🚀 ~ startTestInFullScreen ~ err:", err);
          message.error({
            content:
              "You must allow full-screen mode to take the test. Please refresh the page and try again.",
            duration: 10,
          });
          return false;
        });
        return true;
      } catch (err) {
        console.log(
          "🚀 ~ entering fullscreen anyway as a fallback ~ err:",
          err
        );
        return false;
      }
    }

    // If browser doesn't support fullscreen, show error
    if (!browserInfo.supportsFullScreen) {
      message.error({
        content: `Your browser (${browserInfo.name} ${browserInfo.version}) doesn't support full-screen mode. Please use a modern browser like Chrome, Firefox, or Edge.`,
        duration: 7,
      });
      return false;
    }

    // Try to enter fullscreen
    const success = enterFullScreen();

    // Only show success message if we successfully requested fullscreen
    // Note: This doesn't guarantee the user accepted it
    if (success) {
      message.success({
        content:
          "Test started in full-screen mode. Please do not exit full-screen until you complete the test.",
        duration: 5,
      });

      // Mark test as active
      setTestActive(true);
      sessionStorage.setItem("testStarted", "true");
    }

    return success;
  }, [browserInfo, detectionFailed, enterFullScreen]);

  // Function to end test and allow exiting fullscreen
  const endTest = useCallback(() => {
    // Mark test as inactive
    setTestActive(false);
    sessionStorage.setItem("testStarted", "false");
    sessionStorage.setItem("testFullscreenActive", "false");

    // Allow exiting fullscreen
    message.success({
      content: "Test completed. You may now exit full-screen mode.",
      duration: 5,
    });
  }, []);

  return {
    isFullScreen,
    browserInfo,
    detectionFailed,
    testActive,
    enterFullScreen,
    exitFullScreen,
    startTestInFullScreen,
    endTest,
  };
}
