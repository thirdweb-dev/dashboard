import { useEffect } from "react";
import TagManager from "react-gtm-module";

export const useGoogleTagManager = () => {
  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID as string });
  }, []);
};
