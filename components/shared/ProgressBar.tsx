import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Modified code from https://github.com/MatinAniss/traction.js

interface ProgressBarProps {
  color: string;
  incrementInterval: number;
  incrementAmount: number;
  transitionDuration: number;
  transitionTimingFunction:
    | "ease"
    | "linear"
    | "ease-in"
    | "ease-out"
    | "ease-in-out";
}

export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  // Declare states
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Progress bar inline styling
  const styling = {
    position: "fixed",
    top: 0,
    left: 0,
    width: `${progress}%`,
    height: "3px",
    backgroundColor: props.color,
    transition: `width ${props.transitionDuration}ms ${props.transitionTimingFunction}`,
    opacity: isVisible ? 1 : 0,
    zIndex: 9999999999,
  } as React.CSSProperties;

  useEffect(() => {
    // Declare timeout
    let increment: NodeJS.Timeout;

    // Route change start function
    const onRouteChangeStart = () => {
      setIsVisible(true);
      setProgress(props.incrementAmount);
      increment = setInterval(() => {
        setProgress((_progress) =>
          Math.min(_progress + props.incrementAmount, 90),
        );
      }, props.incrementInterval);
    };

    // Route change complete function
    const onRouteChangeComplete = () => {
      clearInterval(increment);
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, props.transitionDuration);
    };

    // Route change error function
    const onRouteChangeError = () => {
      clearInterval(increment);
      setProgress(100);
      setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, props.transitionDuration);
    };

    // Router event listeners
    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);
    router.events.on("routeChangeError", onRouteChangeError);

    // Use effect return
    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
      router.events.off("routeChangeError", onRouteChangeError);
      clearInterval(increment);
    };
  }, [
    props.incrementAmount,
    props.incrementInterval,
    props.transitionDuration,
    router.events,
  ]);

  // eslint-disable-next-line react/forbid-dom-props
  return <div style={styling}></div>;
};
