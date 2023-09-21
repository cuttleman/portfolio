"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { ETheme } from "@common/types/enum";

import { useGTM } from "./GTMProvider.client";

interface IContext {
  theme: ETheme;
  onToggleTheme: () => void;
}

const context = createContext<IContext>({} as IContext);

export const useTheme = () => useContext(context);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<ETheme>(ETheme.DARK);
  const { gtmTheme } = useGTM();

  const changeTheme = (_theme: ETheme) => {
    setTheme(_theme);
  };

  const onToggleTheme = () => {
    let _theme = localStorage.getItem("theme") as ETheme;

    if (_theme === ETheme.DARK) _theme = ETheme.LIGHT;
    else if (_theme === ETheme.LIGHT) _theme = ETheme.DARK;

    localStorage.setItem("theme", _theme);
    document.body.setAttribute("class", _theme);
    changeTheme(_theme);
    gtmTheme(_theme);
  };

  const initTheme = () => {
    let _theme = (localStorage.getItem("theme") || ETheme.DARK) as ETheme;

    if (window.matchMedia("(prefers-color-scheme: light)").matches) _theme = ETheme.LIGHT;
    localStorage.setItem("theme", _theme);

    document.body.setAttribute("class", _theme);
    changeTheme(_theme);
  };

  useEffect(() => {
    initTheme();
  }, []);

  return <context.Provider value={{ theme, onToggleTheme }}>{children}</context.Provider>;
};

export default ThemeProvider;
