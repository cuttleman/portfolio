"use client";

import { createContext, useContext, useEffect } from "react";
import TagManager from "react-gtm-module";

import { GTM_ID } from "@common/constants";

import type { ELocation, ETheme } from "@common/types/enum";

interface IContext {
  gtmTheme: (_theme: ETheme) => void;
  gtmFlying: (_to: ELocation) => void;
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

  useEffect(() => {
    if (process.env.ENV === "production") {
      TagManager.initialize({ gtmId: GTM_ID });
    }
  }, []);

  return <Context.Provider value={{ gtmTheme, gtmFlying }}>{children}</Context.Provider>;
};

export default GTMProvider;
