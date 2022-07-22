import flat from "flat";
import posthog from "posthog-js";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ComponentWithChildren } from "types/component-with-children";

const TrackPageContext = createContext("root");

type TrackParams = {
  category: string;
  action: string;
  label?: string;
  [key: string]: any;
  page?: never;
};

export function useTrack(params?: Record<string, any>) {
  const pageContext = useContext(TrackPageContext);
  const trackEventWithCategoryActionLabel = useCallback(
    (trackParams: TrackParams) => {
      const { category, action, label, ...restData } = trackParams;
      const catActLab = label
        ? `${category}.${action}.${label}`
        : `${category}.${action}`;
      if (process.env.NODE_ENV === "development") {
        console.debug(`[PH.capture]:${catActLab}`, restData);
      }
      posthog.capture(catActLab, {
        ...flat({ ...params, ...restData }),
        page: pageContext,
      });
    },
    [pageContext, params],
  );

  return trackEventWithCategoryActionLabel;
}

export const TrackPageContextProvider: ComponentWithChildren<{
  pageContext: string;
}> = ({ pageContext, children }) => {
  const prevPageRef = useRef<string>();

  useEffect(() => {
    if (prevPageRef.current === pageContext) {
      return;
    }
    if (process.env.NODE_ENV === "development") {
      console.debug(`[PH.pageview]:`, pageContext);
    }
    posthog.capture("$pageview", { page: pageContext });

    return () => {
      prevPageRef.current = pageContext;
    };
  }, [pageContext]);
  return (
    <TrackPageContext.Provider value={pageContext}>
      {children}
    </TrackPageContext.Provider>
  );
};
