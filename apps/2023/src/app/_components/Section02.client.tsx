"use client";

import clsx from "clsx";
import { useInView } from "framer-motion";
import { type SyntheticEvent, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

import homeStyles from "../_styles/home.module.scss";

import GoogleMapContainer from "./partials/GoogleMapContainer.client";
import ModelContainer from "./partials/ModelContainer.client";
import RoomModel from "./partials/RoomModel.client";

enum ELocation {
  NOMAD_CODERS = "nomad-coders",
  ITAMGAMES = "itamgames",
  METAVERSE_WORLD = "metaverse-world",
  QUEST3 = "quest3",
}

const baseDestination = { toHome: false, toItam: false, toLab: false, toMW: false };

const Section02 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [destination, setDestination] = useState(baseDestination);
  const [location, setLocation] = useState<ELocation>(ELocation.NOMAD_CODERS);
  const [isFlight, setIsFlight] = useState(false);
  const [workHistoryTxt, setWorkHistoryTxt] = useState("nomad-coders");

  const flightTrigger = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { tooltipId } = (e.target as HTMLButtonElement).dataset as { tooltipId: ELocation };

    if (isFlight || location === tooltipId) return;

    switch (tooltipId) {
      case ELocation.NOMAD_CODERS:
        setDestination({ ...baseDestination, toHome: true });
        setLocation(ELocation.NOMAD_CODERS);
        setIsFlight(true);
        break;
      case ELocation.ITAMGAMES:
        setDestination({ ...baseDestination, toItam: true });
        setLocation(ELocation.ITAMGAMES);
        setIsFlight(true);
        break;
      case ELocation.METAVERSE_WORLD:
        setDestination({ ...baseDestination, toMW: true });
        setLocation(ELocation.METAVERSE_WORLD);
        setIsFlight(true);
        break;
      case ELocation.QUEST3:
        setDestination({ ...baseDestination, toLab: true });
        setLocation(ELocation.QUEST3);
        setIsFlight(true);
        break;
      default:
        break;
    }
  };

  const changeBalloonText = () => {
    switch (location) {
      case ELocation.NOMAD_CODERS:
        setWorkHistoryTxt("nomad-coders");
        break;
      case ELocation.ITAMGAMES:
        setWorkHistoryTxt("itamgames");
        break;
      case ELocation.METAVERSE_WORLD:
        setWorkHistoryTxt("metaverse-world");
        break;
      case ELocation.QUEST3:
        setWorkHistoryTxt("quest3");
        break;
      default:
        break;
    }
  };

  const onArrived = () => {
    setIsFlight(false);
    changeBalloonText();
  };

  return (
    <div className={homeStyles["section-container"]} ref={ref}>
      <div className={homeStyles.section}>
        <div className={homeStyles.section02}>
          <GoogleMapContainer
            toHome={destination.toHome}
            toItam={destination.toItam}
            toLab={destination.toLab}
            toMW={destination.toMW}
          />
          <ModelContainer cameraNear={0.1} cameraPosition={[10, 6, 10]}>
            <RoomModel isFlight={isFlight} isInit={isInView} onArrived={onArrived} />
          </ModelContainer>

          <div
            className={clsx(
              homeStyles["work-history-balloon"],
              isFlight && homeStyles["work-history-balloon--hide"]
            )}
          >
            {workHistoryTxt}
          </div>

          <div className={homeStyles["career-btns"]}>
            <button
              className={location === ELocation.NOMAD_CODERS ? homeStyles["button--active"] : ""}
              data-tooltip-content="flight to home"
              data-tooltip-id={ELocation.NOMAD_CODERS}
              onClick={flightTrigger}
              type="button"
            >
              1
            </button>
            <Tooltip id={ELocation.NOMAD_CODERS} />
            <button
              className={location === ELocation.ITAMGAMES ? homeStyles["button--active"] : ""}
              data-tooltip-content="flight to itamgames"
              data-tooltip-id={ELocation.ITAMGAMES}
              onClick={flightTrigger}
              type="button"
            >
              2
            </button>
            <Tooltip id={ELocation.ITAMGAMES} />
            <button
              className={location === ELocation.METAVERSE_WORLD ? homeStyles["button--active"] : ""}
              data-tooltip-content="flight to metaverse world"
              data-tooltip-id={ELocation.METAVERSE_WORLD}
              onClick={flightTrigger}
              type="button"
            >
              3
            </button>
            <Tooltip id={ELocation.METAVERSE_WORLD} />
            <button
              className={location === ELocation.QUEST3 ? homeStyles["button--active"] : ""}
              data-tooltip-content="flight quest3"
              data-tooltip-id={ELocation.QUEST3}
              onClick={flightTrigger}
              type="button"
            >
              4
            </button>
            <Tooltip id={ELocation.QUEST3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section02;
