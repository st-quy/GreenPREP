import { useState, useEffect, useCallback, useRef } from "react";
import { message, Modal } from "antd";

export function useFullScreen() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [testActive, setTestActive] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [browserInfo, setBrowserInfo] = useState(null);

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

  // Attempts to enter fullscreen mode
  const enterFullScreen = useCallback(
    (isAutoRestore = false) => {
      autoRestoringFullscreen.current = isAutoRestore;

      if (
        document.fullscreenElement ||
        document["webkitFullscreenElement"] ||
        document["mozFullScreenElement"] ||
        document["msFullscreenElement"]
      ) {
        autoRestoringFullscreen.current = false;
        return true;
      }

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

        if (fullscreenPromise && fullscreenPromise.then) {
          fullscreenPromise.catch((err) => {
            console.error("Fullscreen request was rejected:", err);

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

        sessionStorage.setItem("testFullscreenActive", "true");
        return true;
      } catch (err) {
        console.error("Failed to enter fullscreen:", err);

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
      if (
        !document.fullscreenElement &&
        !document["webkitFullscreenElement"] &&
        !document["mozFullScreenElement"] &&
        !document["msFullscreenElement"]
      ) {
        return;
      }

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

  // Sets up all event listeners for test security
  const setupEventListeners = useCallback(() => {
    if (eventListenersSetUp.current) return;

    // Prevents keyboard shortcuts that could disrupt the test
    const handleKeyDown = (e) => {
      if (!testActive) return;

      // Handle Ctrl+C (copy)
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
        e.stopPropagation();
        showModal({
          title: "Copy Not Allowed",
          content: "Copying content during the test is not allowed.",
          okText: "Continue Test",
          maskClosable: false,
        });
        return false;
      }

      // Handle Ctrl+V (paste)
      if (e.ctrlKey && e.key === "v") {
        e.preventDefault();
        e.stopPropagation();
        showModal({
          title: "Paste Not Allowed",
          content: "Pasting content during the test is not allowed.",
          okText: "Continue Test",
          maskClosable: false,
        });
        return false;
      }

      // Handle Ctrl+W (close tab)
      if (e.ctrlKey && e.key === "w") {
        e.preventDefault();
        e.stopPropagation();
        showModal({
          title: "Closing Tab Not Allowed",
          content: "Closing the tab during the test is not allowed.",
          okText: "Continue Test",
          maskClosable: false,
        });
        return false;
      }

      if (e.ctrlKey && e.key === "Tab") {
        e.preventDefault();
        e.stopPropagation();
        showModal({
          title: "Tab Switching Not Allowed",
          content: "Switching tabs during the test is not allowed.",
          okText: "Continue Test",
          maskClosable: false,
        });
        return false;
      }
      if (e.ctrlKey && e.key === "Tab") {
        e.preventDefault();
        e.stopPropagation();
        showModal({
          title: "Tab Switching Not Allowed",
          content: "Switching tabs during the test is not allowed.",
          okText: "Continue Test",
          maskClosable: false,
        });
        return false;
      }
      if (e.ctrlKey && e.key === "n") {
        e.preventDefault();
        e.stopPropagation();
        showModal({
          title: "New Window Not Allowed",
          content: "Opening new windows during the test is not allowed.",
          okText: "Continue Test",
          maskClosable: false,
        });
        return false;
      }
      if (e.ctrlKey && e.key === "t") {
        e.preventDefault();
        e.stopPropagation();
        showModal({
          title: "New Tab Not Allowed",
          content: "Opening new tabs during the test is not allowed.",
          okText: "Continue Test",
          maskClosable: false,
        });
        return false;
      }

      //Macos

      const blockedKeys = {
        F11: {
          title: "Fullscreen Toggle Not Allowed",
          content: "Toggling fullscreen during the test is not allowed.",
        },
        F4: {
          condition: e.altKey,
          title: "Closing Window Not Allowed",
          content: "Closing the window during the test is not allowed.",
        },
        F12: {
          title: "Developer Tools Not Allowed",
          content: "Opening developer tools during the test is not allowed.",
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

      // Check other blocked keys
      const keyInfo = blockedKeys[e.key];
      if (keyInfo) {
        if (keyInfo.condition === undefined || keyInfo.condition === true) {
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

      if (isVisible && testActive && !isFullScreen) {
        enterFullScreen();
      }

      if (!isVisible && testActive) {
        sessionStorage.setItem("tabSwitchAttempted", "true");
      }

      if (
        isVisible &&
        sessionStorage.getItem("tabSwitchAttempted") === "true"
      ) {
        //send log to backend or somthing else here
        console.log("Security Alert: Change Tab detected", {
          timestamp: new Date().toISOString(),
          event: "Tab change",
          userAgent: navigator.userAgent,
        });
        sessionStorage.removeItem("tabSwitchAttempted");
        showModal({
          title: "Tab Switching Detected",
          content:
            "Switching tabs during the test is not allowed. This incident has been recorded.",
          okText: "Continue Test",
        });
      }
    };

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

      // Log fullscreen exit attempts
      if (!isCurrentlyFullScreen && testActive) {
        // send to back-end or somthing else here
        console.log("Security Alert: Fullscreen exited", {
          timestamp: new Date().toISOString(),
          event: "fullscreen_exit",
          userAgent: navigator.userAgent,
        });
      }

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
    window.addEventListener("copy", (event) => {
      showModal({
        title: "Copy Not Allowed",
        content: "Copy Function during the test is not allowed.",
        okText: "Continue Test",
        maskClosable: false,
      });
    });
    window.addEventListener("paste", (event) => {
      showModal({
        title: "Paste Not Allowed",
        content: "Paste Function during the test is not allowed.",
        okText: "Continue Test",
        maskClosable: false,
      });
    });
    window.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("contextmenu", handleContextMenu, true);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    eventListenersSetUp.current = true;

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

  // Detect browser capabilities and set up event listeners
  useEffect(() => {
    // Detect browser type and fullscreen support
    const detectBrowser = () => {
      try {
        const userAgent = navigator.userAgent;
        let browserName = "Unknown";
        let browserVersion = "Unknown";

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

        const docEl = document.documentElement;
        const supportsFullScreen =
          docEl.requestFullscreen !== undefined ||
          "webkitRequestFullscreen" in docEl ||
          "mozRequestFullScreen" in docEl ||
          "msRequestFullscreen" in docEl;

        supportsFullscreenRef.current = supportsFullScreen;

        return {
          name: browserName,
          version: browserVersion,
          supportsFullScreen,
        };
      } catch (err) {
        console.error("Browser detection failed:", err);

        return {
          name: "Unknown",
          version: "Unknown",
          supportsFullScreen: false,
        };
      }
    };

    setBrowserInfo(detectBrowser());

    const isTestActive = sessionStorage.getItem("testStarted") === "true";
    setTestActive(isTestActive);

    const cleanupListeners = setupEventListeners();
    return cleanupListeners;
  }, [setupEventListeners]);

  // Handle restoring fullscreen after page reload
  useEffect(() => {
    if (fullscreenRestorationAttempted.current) return;

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
        }, 500);

        return () => clearTimeout(timer);
      }
    }

    fullscreenRestorationAttempted.current = true;
  }, [showModal, enterFullScreen]);

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

  return {
    isFullScreen,
    browserInfo,
    testActive,
    isTabVisible,
    enterFullScreen,
    exitFullScreen,
    startTestInFullScreen,
    endTest,
  };
}
