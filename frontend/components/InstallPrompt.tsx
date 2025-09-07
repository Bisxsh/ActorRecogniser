"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const isTouchDevice = useMediaQuery({ query: "(hover: none)" });

  useEffect(() => {
    setIsIOS(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  if (!isIOS && !isTouchDevice) {
    return null; // Only show on iOS or touch devices
  }

  return (
    <div>
      <h1 className="text-h3 text-center text-alt-text">Install App</h1>
      {!isIOS && <button>Add to Home Screen</button>}
      {isIOS && (
        <p className="text-p text-alt-text text-center my-4">
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then &quot;Add to Home Screen&quot;
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      )}
    </div>
  );
}
