"use client";

import { useState, useEffect } from "react";

// Define the shape of the object the hook will return
type WindowDimensions = {
  width: number | null;
  height: number | null;
};

/**
 * A custom React hook to get and track the dimensions of the browser window.
 * It's safe to use in a Next.js environment as it handles server-side rendering.
 *
 * @returns {WindowDimensions} An object containing the current window width and height.
 */
export function useWindowDimensions(): WindowDimensions {
  // Check if `window` is defined to handle server-side rendering (SSR) gracefully.
  // This prevents the hook from throwing a `ReferenceError` on the server.
  const hasWindow = typeof window !== "undefined";

  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: hasWindow ? window.innerWidth : null,
    height: hasWindow ? window.innerHeight : null,
  });

  useEffect(() => {
    // This effect will only run in the browser after the component has mounted.
    if (hasWindow) {
      const handleResize = () => {
        // Update the state with the new window dimensions
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Add the event listener for the 'resize' event
      window.addEventListener("resize", handleResize);

      // Call the handler initially to set the dimensions
      // This is important for when the component mounts after the first render
      handleResize();

      // Clean up the event listener when the component unmounts
      // This prevents memory leaks
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]); // The dependency array ensures the effect runs only when needed

  return windowDimensions;
}
