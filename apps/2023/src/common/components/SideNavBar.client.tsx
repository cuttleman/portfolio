"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { HiSun, HiMoon } from "react-icons/hi";
import { MdContactSupport } from "react-icons/md";
import { RiMapPinRangeFill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";

import { ETheme, useTheme } from "@common/contexts/ThemeProvider";

import logoIcon from "../../app/icon.png";

const SideNavBar = () => {
  const [activeTab, setActiveTab] = useState("");
  const { theme, changeTheme } = useTheme();

  const toNav = (id: string) => {
    const mainEl = document.querySelector("main");
    const targetEl = document.getElementById(id);

    mainEl?.scrollTo({ top: targetEl?.offsetTop, behavior: "smooth" });
  };

  const handleIntersect = (
    entries: IntersectionObserverEntry[],
    _observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveTab(entry.target.id);
      }
    });
  };

  const initObserver = () => {
    const infoEl = document.getElementById("info");
    const mapEl = document.getElementById("career");
    const contactEl = document.getElementById("contact");

    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.9 });

    if (infoEl && mapEl && contactEl) {
      observer.observe(infoEl);
      observer.observe(mapEl);
      observer.observe(contactEl);
    }

    return observer;
  };

  const onToggleTheme = () => {
    let _theme = localStorage.getItem("theme") as ETheme;

    if (_theme === ETheme.DARK) _theme = ETheme.LIGHT;
    else if (_theme === ETheme.LIGHT) _theme = ETheme.DARK;

    localStorage.setItem("theme", _theme);
    document.body.setAttribute("class", _theme);
    changeTheme(_theme);
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
    const observer = initObserver();

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- .
  }, []);

  return (
    <nav>
      <button className="logo" onClick={() => toNav("info")} type="button">
        <Image alt="logo" src={logoIcon} />
      </button>

      <ul>
        <li className={clsx(activeTab === "info" && "active")}>
          <button
            data-tooltip-content="info"
            data-tooltip-id="_info"
            onClick={() => toNav("info")}
            type="button"
          >
            <GoHomeFill />
          </button>
        </li>
        <li className={clsx(activeTab === "career" && "active")}>
          <button
            data-tooltip-content="career"
            data-tooltip-id="_career"
            onClick={() => toNav("career")}
            type="button"
          >
            <RiMapPinRangeFill />
          </button>
        </li>
        <li className={clsx(activeTab === "contact" && "active")}>
          <button
            data-tooltip-content="contact"
            data-tooltip-id="_contact"
            onClick={() => toNav("contact")}
            type="button"
          >
            <MdContactSupport />
          </button>
        </li>
        <Tooltip id="_info" place="right" />
        <Tooltip id="_career" place="right" />
        <Tooltip id="_contact" place="right" />
      </ul>

      <div className="toggle-theme">
        <button className={theme} onClick={onToggleTheme} type="button">
          {theme === ETheme.DARK ? <HiMoon /> : <HiSun />}
        </button>
      </div>
    </nav>
  );
};

export default SideNavBar;
