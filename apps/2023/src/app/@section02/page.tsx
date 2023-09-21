"use client";

import "./_styles/page.scss";

import clsx from "clsx";
import { useInView } from "framer-motion";
import { type SyntheticEvent, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";

import ModelContainer from "@common/components/ModelContainer.client";
import { careerHistory, companiesCoordinate } from "@common/constants";
import { useGTM } from "@common/contexts/GTMProvider.client";
import { ELocation } from "@common/types/enum";
import { haversine } from "@common/utils/distance";

import GoogleMapContainer from "./_components/GoogleMapContainer.client";
import RoomModel from "./_components/RoomModel.client";

const baseDestination = { toHome: false, toItam: false, toLab: false, toMW: false };

const Section02 = () => {
  const ref = useRef(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true });
  const { gtmFlying } = useGTM();
  const [destination, setDestination] = useState(baseDestination);
  const [location, setLocation] = useState<ELocation>(ELocation.NOMAD_CODERS);
  const [isFlight, setIsFlight] = useState(false);
  const [distance, setDistance] = useState(0);
  const [workHistoryTxt, setWorkHistoryTxt] = useState(careerHistory[ELocation.NOMAD_CODERS]);

  const flightTrigger = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { tooltipId } = (e.target as HTMLButtonElement).dataset as { tooltipId: ELocation };

    if (isFlight || location === tooltipId) return;

    const prevLocation = companiesCoordinate[location];
    const nextLocation = companiesCoordinate[tooltipId];

    const distanceKM = haversine({
      lat1: prevLocation.lat,
      lng1: prevLocation.lng,
      lat2: nextLocation.lat,
      lng2: nextLocation.lng,
    });

    setIsFlight(true);
    setDistance(distanceKM);
    gtmFlying(tooltipId);

    switch (tooltipId) {
      case ELocation.NOMAD_CODERS:
        setDestination({ ...baseDestination, toHome: true });
        setLocation(ELocation.NOMAD_CODERS);
        break;
      case ELocation.ITAMGAMES:
        setDestination({ ...baseDestination, toItam: true });
        setLocation(ELocation.ITAMGAMES);
        break;
      case ELocation.METAVERSE_WORLD:
        setDestination({ ...baseDestination, toMW: true });
        setLocation(ELocation.METAVERSE_WORLD);
        break;
      case ELocation.QUEST3:
        setDestination({ ...baseDestination, toLab: true });
        setLocation(ELocation.QUEST3);
        break;
      default:
        break;
    }
  };

  const changeBalloonText = () => {
    setWorkHistoryTxt(careerHistory[location]);
  };

  const balloonScrollReset = () => {
    textRef.current?.scrollTo({ top: 0, behavior: "instant" });
  };

  const onArrived = () => {
    setIsFlight(false);
    balloonScrollReset();
    changeBalloonText();
  };

  return (
    <div className="section-container" id="career" ref={ref}>
      <div className="section">
        <div className="section02">
          <GoogleMapContainer
            distance={distance}
            toHome={destination.toHome}
            toItam={destination.toItam}
            toLab={destination.toLab}
            toMW={destination.toMW}
          />
          <ModelContainer cameraNear={0.1} cameraPosition={[10, 6, 10]}>
            <RoomModel
              distance={distance}
              isFlight={isFlight}
              isInit={isInView}
              onArrived={onArrived}
            />
          </ModelContainer>

          <div className={clsx("work-history-balloon", isFlight && "hide")}>
            <p ref={textRef}>{workHistoryTxt}</p>
          </div>

          <div className="career-btns">
            <button
              className={location === ELocation.NOMAD_CODERS ? "button--active" : ""}
              data-tooltip-content="flight to home"
              data-tooltip-id={ELocation.NOMAD_CODERS}
              onClick={flightTrigger}
              type="button"
            >
              1
            </button>
            <Tooltip id={ELocation.NOMAD_CODERS} />
            <button
              className={location === ELocation.ITAMGAMES ? "button--active" : ""}
              data-tooltip-content="flight to itamgames"
              data-tooltip-id={ELocation.ITAMGAMES}
              onClick={flightTrigger}
              type="button"
            >
              2
            </button>
            <Tooltip id={ELocation.ITAMGAMES} />
            <button
              className={location === ELocation.METAVERSE_WORLD ? "button--active" : ""}
              data-tooltip-content="flight to metaverse world"
              data-tooltip-id={ELocation.METAVERSE_WORLD}
              onClick={flightTrigger}
              type="button"
            >
              3
            </button>
            <Tooltip id={ELocation.METAVERSE_WORLD} />
            <button
              className={location === ELocation.QUEST3 ? "button--active" : ""}
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
