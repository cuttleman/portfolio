"use client";

import { createContext, useContext, useEffect } from "react";
import TagManager from "react-gtm-module";

import { GTM_ID } from "@common/constants";

import type { ELocation, ETheme } from "@common/types/enum";

interface IContext {
  gtmTheme: (_theme: ETheme) => void;
  gtmFlying: (_to: ELocation) => void;
  gtmMail: (_from: string) => void;
}

const Context = createContext<IContext>({} as IContext);

export const useGTM = () => useContext(Context);

const GTMProvider = ({ children }) => {
  const gtmTheme = (theme: ETheme) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "usr_theme",
        mode: theme,
      },
    });
  };

  const gtmFlying = (to: ELocation) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "usr_flying",
        to_flying: to,
      },
    });
  };

  const gtmMail = (from: string) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "usr_mail",
        from_addr: from,
      },
    });
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENV === "production") {
      TagManager.initialize({ gtmId: GTM_ID });
    }
  }, []);

  return <Context.Provider value={{ gtmTheme, gtmFlying, gtmMail }}>{children}</Context.Provider>;
};

export default GTMProvider;
