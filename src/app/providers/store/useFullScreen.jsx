import { useState, useEffect, useCallback, useRef } from "react";
import { message, Modal } from "antd";

export function useFullScreen() {
  // --- State Management ---
  const [isFullScreen, setIsFullScreen] = useState(false); // Tracks if browser is in fullscreen mode
  const [testActive, setTestActive] = useState(false); // Tracks if test is currently active
  const [isTabVisible, setIsTabVisible] = useState(true); // Tracks if tab is visible or hidden
  const [browserInfo, setBrowserInfo] = useState(null); // Stores browser name, version and capabilities

  // --- Refs (persist between renders without causing re-renders) ---
  const eventListenersSetUp = useRef(false); // Prevents duplicate event listeners
  const modalShownRef = useRef(false); // Prevents multiple modals showing at once
  const messageShownRef = useRef(false); // Prevents multiple messages showing at once
  const autoRestoringFullscreen = useRef(false); // Tracks if we're auto-restoring fullscreen
  const fullscreenRestorationAttempted = useRef(false); // Prevents multiple restoration attempts
  const supportsFullscreenRef = useRef(null); // Cached fullscreen support check

  // Helper function to check if fullscreen is supported (with caching)
  const checkFullscreenSupport = useCallback(() => {
    if (supportsFullscreenRef.current !== null)
      return supportsFullscreenRef.current;

    try {
      const docEl = document.documentElement;
      // Check for standard and vendor-prefixed fullscreen APIs
      const supportsFullScreen =
        docEl.requestFullscreen !== undefined ||
        "webkitRequestFullscreen" in docEl ||
        "mozRequestFullScreen" in docEl ||
        "msRequestFullscreen" in docEl;

      supportsFullscreenRef.current = supportsFullScreen;
      return supportsFullScreen;
    } catch (err) {
      console.error("Error checking fullscreen support:", err);
      supportsFullscreenRef.current = false;
      return false;
    }
  }, []);

  // --- UI Notification Functions ---

  // Shows a modal dialog with anti-spam protection
  const showModal = useCallback((modalConfig) => {
    if (modalShownRef.current) return;
    modalShownRef.current = true;

    Modal.warning({
      ...modalConfig,
      onOk: () => {
        modalShownRef.current = false;
        if (modalConfig.onOk) modalConfig.onOk();
      },
      onCancel: () => {
        modalShownRef.current = false;
        if (modalConfig.onCancel) modalConfig.onCancel();
      },
    });
  }, []);

  // Shows a toast message with anti-spam protection
  const showMessage = useCallback((messageConfig) => {
    if (messageShownRef.current) return;
    messageShownRef.current = true;

    message[messageConfig.type || "info"]({
      ...messageConfig,
      onClose: () => {
        messageShownRef.current = false;
        if (messageConfig.onClose) messageConfig.onClose();
      },
    });
  }, []);

  // --- Fullscreen Control Functions ---

  // Attempts to enter fullscreen mode
  const enterFullScreen = useCallback(
    (isAutoRestore = false) => {
      autoRestoringFullscreen.current = isAutoRestore;

      // Skip if already in fullscreen
      if (
        document.fullscreenElement ||
        document["webkitFullscreenElement"] ||
        document["mozFullScreenElement"] ||
        document["msFullscreenElement"]
      ) {
        autoRestoringFullscreen.current = false;
        return true;
      }

      // Check browser compatibility
      if (!browserInfo?.supportsFullScreen && !isAutoRestore) {
        showMessage({
          content:
            "Your browser doesn't support full-screen mode. Please use a modern browser like Chrome, Firefox, or Edge.",
          duration: 3,
          type: "error",
        });
        autoRestoringFullscreen.current = false;
        return false;
      }

      const docEl = document.documentElement;
      try {
        // Try different fullscreen APIs based on browser support
        let fullscreenPromise;
        if (docEl.requestFullscreen) {
          fullscreenPromise = docEl.requestFullscreen();
        } else if (docEl["webkitRequestFullscreen"]) {
          fullscreenPromise = docEl["webkitRequestFullscreen"]();
        } else if (docEl["mozRequestFullScreen"]) {
          fullscreenPromise = docEl["mozRequestFullScreen"]();
        } else if (docEl["msRequestFullscreen"]) {
          fullscreenPromise = docEl["msRequestFullscreen"]();
        }

        // Modern browsers return a promise from requestFullscreen
        if (fullscreenPromise && fullscreenPromise.then) {
          fullscreenPromise.catch((err) => {
            console.error("Fullscreen request was rejected:", err);

            // Show different messages based on context
            if (!autoRestoringFullscreen.current) {
              showMessage({
                content:
                  "You must allow full-screen mode to take the test. Please refresh the page and try again.",
                duration: 3,
                type: "error",
              });
            } else if (testActive) {
              showModal({
                title: "Fullscreen Required",
                content:
                  "Please click the button below to enter fullscreen mode and continue your test.",
                okText: "Enter Fullscreen",
                maskClosable: false,
                onOk: () => {
                  autoRestoringFullscreen.current = false;
                  enterFullScreen(false);
                },
              });
            }

            autoRestoringFullscreen.current = false;
          });
        }

        // Store fullscreen state for persistence across page loads
        sessionStorage.setItem("testFullscreenActive", "true");
        return true;
      } catch (err) {
        console.error("Failed to enter fullscreen:", err);

        // Handle errors differently based on context
        if (!isAutoRestore) {
          showMessage({
            content:
              "Failed to enter full-screen mode. You must allow full-screen mode to take the test. Please refresh the page and try again.",
            duration: 3,
            type: "error",
          });
        } else if (testActive) {
          showModal({
            title: "Fullscreen Required",
            content:
              "Please click the button below to enter fullscreen mode and continue your test.",
            okText: "Enter Fullscreen",
            maskClosable: false,
            onOk: () => {
              autoRestoringFullscreen.current = false;
              enterFullScreen(false);
            },
          });
        }

        autoRestoringFullscreen.current = false;
        return false;
      }
    },
    [browserInfo?.supportsFullScreen, testActive, showMessage, showModal]
  );

  // Exits fullscreen mode
  const exitFullScreen = useCallback(() => {
    try {
      // Skip if not in fullscreen
      if (
        !document.fullscreenElement &&
        !document["webkitFullscreenElement"] &&
        !document["mozFullScreenElement"] &&
        !document["msFullscreenElement"]
      ) {
        return;
      }

      // Try different exit fullscreen APIs based on browser support
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document["webkitExitFullscreen"]) {
        document["webkitExitFullscreen"]();
      } else if (document["mozCancelFullScreen"]) {
        document["mozCancelFullScreen"]();
      } else if (document["msExitFullscreen"]) {
        document["msExitFullscreen"]();
      }

      sessionStorage.setItem("testFullscreenActive", "false");
    } catch (err) {
      console.error("Error exiting fullscreen:", err);
    }
  }, []);

  // --- Event Handling ---

  // Sets up all event listeners for test security
  const setupEventListeners = useCallback(() => {
    if (eventListenersSetUp.current) return;

    // Prevents keyboard shortcuts that could disrupt the test
    const handleKeyDown = (e) => {
      if (!testActive) return;

      // Map of blocked keys and their warning messages
      const blockedKeys = {
        F11: {
          title: "Fullscreen Toggle Not Allowed",
          content: "Toggling fullscreen during the test is not allowed.",
        },
        Escape: {
          title: "Fullscreen Required", // Can't prevent because of browse policies
          content:
            "You must remain in fullscreen mode during the test. Please re-enter fullscreen manually.",
        },
        Tab: {
          condition: e.ctrlKey,
          title: "Tab Switching Not Allowed",
          content: "Switching tabs during the test is not allowed.",
        },
        t: {
          condition: e.ctrlKey,
          title: "New Tab Not Allowed",
          content: "Opening new tabs during the test is not allowed.",
        },
        n: {
          condition: e.ctrlKey,
          title: "New Window Not Allowed",
          content: "Opening new windows during the test is not allowed.",
        },
        w: {
          condition: e.ctrlKey,
          title: "Closing Tab Not Allowed",
          content: "Closing the tab during the test is not allowed.",
        },
        c: {
          condition: e.ctrlKey,
          title: "Copy Not Allowed",
          content: "Copying content during the test is not allowed.",
        },
        v: {
          condition: e.ctrlKey,
          title: "Paste Not Allowed",
          content: "Pasting content during the test is not allowed.",
        },
        F4: {
          condition: e.altKey,
          title: "Closing Window Not Allowed",
          content: "Closing the window during the test is not allowed.",
        },
      };

      // Handle Ctrl+1 through Ctrl+9 (tab switching)
      if (
        e.ctrlKey &&
        !e.altKey &&
        !e.shiftKey &&
        !isNaN(Number.parseInt(e.key)) &&
        Number.parseInt(e.key) >= 1 &&
        Number.parseInt(e.key) <= 9
      ) {
        e.preventDefault();
        e.stopPropagation();
        showModal({
          title: "Tab Switching Not Allowed",
          content: "Switching tabs during the test is not allowed.",
          okText: "Continue Test",
        });
        return false;
      }

      // Handle Alt+Left/Right (browser navigation)
      if (e.altKey && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        e.stopPropagation();
        showModal({
          title: "Browser Navigation Not Allowed",
          content:
            "Using browser back/forward navigation during the test is not allowed.",
          okText: "Continue Test",
        });
        return false;
      }

      // Handle Alt+Tab (can't prevent because of Alt+Tab is handled outside the browser entirely, by the Windows DWM, but can warn)
      // Do something here according to the schools/web polices
      if (e.altKey && e.key === "Tab") {
        showModal({
          title: "Warning",
          content:
            "Switching applications during the test is not allowed. Please remain in the test window.",
          okText: "Continue Test",
        });
      }

      // Check other blocked keys
      const keyInfo = blockedKeys[e.key];
      if (keyInfo && (!keyInfo.condition || keyInfo.condition === true)) {
        e.preventDefault();
        e.stopPropagation();
        showModal({
          title: keyInfo.title,
          content: keyInfo.content,
          okText: "Continue Test",
          maskClosable: false,
        });
        return false;
      }
    };

    // Prevents right-click context menu
    const handleContextMenu = (e) => {
      if (testActive) {
        e.preventDefault();
        e.stopPropagation();
        showMessage({
          content: "Right-click menu is disabled during the test.",
          duration: 3,
          type: "warning",
        });
        return false;
      }
    };

    // Shows confirmation when trying to leave the page
    const handleBeforeUnload = (e) => {
      if (testActive) {
        e.preventDefault();
        e.returnValue =
          "Are you sure you want to leave the test? Your progress may be lost.";
        return "Are you sure you want to leave the test? Your progress may be lost.";
      }
    };

    // Detects tab switching and visibility changes
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === "visible";
      setIsTabVisible(isVisible);

      // Re-enter fullscreen if needed when returning to tab
      if (isVisible && testActive && !isFullScreen) {
        enterFullScreen();
      }

      // Track tab switching attempts
      if (!isVisible && testActive) {
        sessionStorage.setItem("tabSwitchAttempted", "true");
      }

      // Show warning if user switched tabs and returned
      if (
        isVisible &&
        sessionStorage.getItem("tabSwitchAttempted") === "true"
      ) {
        sessionStorage.removeItem("tabSwitchAttempted");
        showModal({
          title: "Tab Switching Detected",
          content:
            "Switching tabs during the test is not allowed. This incident has been recorded.",
          okText: "Continue Test",
        });
      }
    };

    // Detects when fullscreen state changes
    const handleFullScreenChange = () => {
      const isCurrentlyFullScreen = Boolean(
        document.fullscreenElement ||
          document["webkitFullscreenElement"] ||
          document["mozFullScreenElement"] ||
          document["msFullscreenElement"]
      );

      setIsFullScreen(isCurrentlyFullScreen);
      sessionStorage.setItem(
        "testFullscreenActive",
        isCurrentlyFullScreen.toString()
      );

      // Prompt to re-enter fullscreen if exited during test
      if (
        !isCurrentlyFullScreen &&
        testActive &&
        !autoRestoringFullscreen.current
      ) {
        showModal({
          title: "Fullscreen Required",
          content:
            "You exited fullscreen mode. Please re-enter fullscreen mode to continue the test.",
          okText: "Re-enter Fullscreen",
          maskClosable: false,
          onOk: () => enterFullScreen(),
        });
      }
    };

    // Register all event listeners
    window.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Register fullscreen change listeners (with browser prefixes)
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    eventListenersSetUp.current = true;

    // Cleanup function to remove all event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      document.removeEventListener("contextmenu", handleContextMenu, true);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
      eventListenersSetUp.current = false;
    };
  }, [testActive, isFullScreen, enterFullScreen, showModal, showMessage]);

  // --- Initialization ---

  // Detect browser capabilities and set up event listeners
  useEffect(() => {
    // Detect browser type and fullscreen support
    const detectBrowser = () => {
      try {
        const userAgent = navigator.userAgent;
        let browserName = "Unknown";
        let browserVersion = "Unknown";

        // Detect browser type from user agent string
        if (
          userAgent.match(/chrome|chromium|crios/i) ||
          userAgent.match(/opr\//i)
        ) {
          if (userAgent.match(/opr\//i)) {
            browserName = "Opera";
            const match = userAgent.match(/opr\/(\d+)/);
            if (match) browserVersion = match[1];
          } else {
            browserName = "Chrome";
            const match = userAgent.match(/(?:chrome|chromium|crios)\/(\d+)/);
            if (match) browserVersion = match[1];
          }
        } else if (userAgent.match(/firefox|fxios/i)) {
          browserName = "Firefox";
          const match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
          if (match) browserVersion = match[1];
        } else if (
          userAgent.match(/safari/i) &&
          !userAgent.match(/chrome|chromium|crios/i)
        ) {
          browserName = "Safari";
          const match = userAgent.match(/version\/(\d+)/);
          if (match) browserVersion = match[1];
        } else if (userAgent.match(/edg/i)) {
          browserName = "Edge";
          const match = userAgent.match(/edg\/(\d+)/);
          if (match) browserVersion = match[1];
        }

        // Check fullscreen support
        const docEl = document.documentElement;
        const supportsFullScreen =
          docEl.requestFullscreen !== undefined ||
          "webkitRequestFullscreen" in docEl ||
          "mozRequestFullScreen" in docEl ||
          "msRequestFullscreen" in docEl;

        // Cache result for quick access
        supportsFullscreenRef.current = supportsFullScreen;

        return {
          name: browserName,
          version: browserVersion,
          supportsFullScreen,
        };
      } catch (err) {
        console.error("Browser detection failed:", err);

        // Return fallback values
        return {
          name: "Unknown",
          version: "Unknown",
          supportsFullScreen: false,
        };
      }
    };

    // Set browser info
    setBrowserInfo(detectBrowser());

    // Check if test is active from previous session
    const isTestActive = sessionStorage.getItem("testStarted") === "true";
    setTestActive(isTestActive);

    // Set up event listeners
    const cleanupListeners = setupEventListeners();
    return cleanupListeners;
  }, [setupEventListeners]);

  // --- Fullscreen Restoration ---

  // Handle restoring fullscreen after page reload
  useEffect(() => {
    if (fullscreenRestorationAttempted.current) return;

    // Check if we need to restore fullscreen
    const storedFullscreenState = sessionStorage.getItem(
      "testFullscreenActive"
    );
    const isTestActive = sessionStorage.getItem("testStarted") === "true";

    if (storedFullscreenState === "true" && isTestActive) {
      const isCurrentlyFullScreen = Boolean(
        document.fullscreenElement ||
          document["webkitFullscreenElement"] ||
          document["mozFullScreenElement"] ||
          document["msFullscreenElement"]
      );

      // If we should be in fullscreen but aren't, prompt user
      if (!isCurrentlyFullScreen) {
        const timer = setTimeout(() => {
          showModal({
            title: "Fullscreen Required",
            content:
              "Your test requires fullscreen mode. Please click the button below to continue in fullscreen mode.",
            okText: "Enter Fullscreen",
            maskClosable: false,
            onOk: () => enterFullScreen(false),
          });
        }, 500); // Delay to ensure browser is ready

        return () => clearTimeout(timer);
      }
    }

    fullscreenRestorationAttempted.current = true;
  }, [showModal, enterFullScreen]);

  // --- Public API ---

  // Starts a test in fullscreen mode
  const startTestInFullScreen = useCallback(() => {
    if (!browserInfo?.supportsFullScreen) {
      showMessage({
        content:
          "Your browser doesn't support full-screen mode. Please use a modern browser like Chrome, Firefox, or Edge.",
        duration: 3,
        type: "error",
      });
      return false;
    }

    const success = enterFullScreen(false);

    if (success) {
      showMessage({
        content:
          "Test started in full-screen mode. Please do not exit full-screen until you complete the test.",
        duration: 3,
        type: "success",
      });

      // Mark test as active
      setTestActive(true);
      sessionStorage.setItem("testStarted", "true");
      setupEventListeners();
    }

    return success;
  }, [
    browserInfo?.supportsFullScreen,
    enterFullScreen,
    setupEventListeners,
    showMessage,
  ]);

  // Ends the test and exits fullscreen
  const endTest = useCallback(() => {
    setTestActive(false);
    sessionStorage.setItem("testStarted", "false");
    sessionStorage.setItem("testFullscreenActive", "false");
    exitFullScreen();

    showMessage({
      content: "Test completed. You may now exit full-screen mode.",
      duration: 3,
      type: "success",
    });
  }, [exitFullScreen, showMessage]);

  // Return public API
  return {
    isFullScreen, // Current fullscreen state
    browserInfo, // Browser capabilities (for UI like disabled buttons)
    testActive, // Whether test is currently active
    isTabVisible, // Whether tab is currently visible
    enterFullScreen, // Function to enter fullscreen
    exitFullScreen, // Function to exit fullscreen
    startTestInFullScreen, // Function to start test in fullscreen
    endTest, // Function to end test
  };
}
