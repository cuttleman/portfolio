"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { HiSun, HiMoon } from "react-icons/hi";
import { HiDocument } from "react-icons/hi2";
import { MdContactSupport } from "react-icons/md";
import { RiMapPinRangeFill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";

import { useTheme } from "@common/contexts/ThemeProvider.client";
import { ETheme } from "@common/types/enum";

import logoIcon from "../../app/icon.png";

const NavBar = () => {
  const [activeTab, setActiveTab] = useState("");
  const { theme, onToggleTheme } = useTheme();

  const toNav = (id: string) => {
    const mainEl = document.querySelector("main");
    const targetEl = document.getElementById(id);

    mainEl?.scrollTo({ top: id === "info" ? 0 : targetEl?.offsetTop, behavior: "smooth" });
  };

  const handleIntersect = (
    entries: IntersectionObserverEntry[],
    _observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveTab(entry.target.id.includes("project") ? "project" : entry.target.id);
      }
    });
  };

  const initObserver = () => {
    const infoEl = document.getElementById("info");
    const mapEl = document.getElementById("career");
    const contactEl = document.getElementById("contact");
    const project1El = document.getElementById("project1");
    const project2El = document.getElementById("project2");

    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.9 });

    if (infoEl && mapEl && contactEl && project1El && project2El) {
      observer.observe(infoEl);
      observer.observe(mapEl);
      observer.observe(contactEl);
      observer.observe(project1El);
      observer.observe(project2El);
    }

    return observer;
  };

  useEffect(() => {
    const observer = initObserver();

    return () => {
      observer.disconnect();
    };
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
        <li className={clsx(activeTab === "project" && "active")}>
          <button
            data-tooltip-content="project"
            data-tooltip-id="_project"
            onClick={() => toNav("project1")}
            type="button"
          >
            <HiDocument />
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
        <Tooltip id="_project" place="right" />
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

export default NavBar;
