"use client";

import GoogleMapReact from "google-map-react";
import { useState, useEffect, useCallback, useMemo } from "react";

import {
  type CompaniesCoordinate,
  companiesCoordinate as companiesOriginCoordinate,
  googleMapDarkThemeConfig,
  googleMapLightThemeConfig,
} from "@common/constants";
import { ETheme, useTheme } from "@common/contexts/ThemeProvider";
import useMediaQuery from "@common/hooks/useMediaQuery";

interface IProps {
  toHome: boolean;
  toItam: boolean;
  toMW: boolean;
  toLab: boolean;
  distance: number;
}

const GoogleMapContainer = ({ toHome, toItam, toMW, toLab, distance }: IProps) => {
  const baseZoom = 20;

  const { isMobile } = useMediaQuery();
  const companiesCenterCoordinate = useMemo(
    () =>
      Object.entries(companiesOriginCoordinate).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: { ...value, lat: value.lat + 0.0003 },
        }),
        {}
      ) as typeof companiesOriginCoordinate,
    []
  );
  const [coordinate, setCoordinate] = useState<CompaniesCoordinate>(
    companiesCenterCoordinate["nomad-coders"]
  );
  const [zoom, setZoom] = useState(baseZoom);
  const { theme } = useTheme();

  const renderMarker = useCallback(({ map, maps }) => {
    Object.entries(companiesOriginCoordinate).forEach(([key, value]) => {
      // eslint-disable-next-line no-new -- .
      new maps.Marker({
        position: {
          lat: value.lat,
          lng: value.lng,
        },
        map,
        title: key,
      });
    });
  }, []);

  function* zoomGenerateSequence(type: "increase" | "decrease") {
    let limit = Math.max(Math.floor(distance / 3.5), 4.5);
    if (isMobile) limit += 1;
    const increment = 0.1;

    const promises: any[] = [];
    for (
      let i = type === "increase" ? 0 : limit;
      type === "increase" ? i <= limit : i >= 0;
      type === "increase" ? (i += increment) : (i -= increment)
    ) {
      promises.push(
        yield new Promise((r) => {
          setTimeout(() => r(setZoom(baseZoom - i)), i * 10);
        })
      );
    }

    return Promise.all(promises);
  }

  const zoomOut = async () => {
    const sequence = zoomGenerateSequence("increase");
    for await (const _ of sequence) continue;
  };

  const zoomIn = async () => {
    const sequence = zoomGenerateSequence("decrease");
    for await (const _ of sequence) continue;
  };

  const onFlight = async (to: CompaniesCoordinate) => {
    await zoomOut();
    setCoordinate({ ...to, lat: to.lat });
    await zoomIn();
  };

  useEffect(() => {
    if (toHome) onFlight(companiesCenterCoordinate["nomad-coders"]).catch(() => {});
    if (toItam) onFlight(companiesCenterCoordinate.itamgames).catch(() => {});
    if (toMW) onFlight(companiesCenterCoordinate["metaverse-world"]).catch(() => {});
    if (toLab) onFlight(companiesCenterCoordinate.quest3).catch(() => {});
  }, [toHome, toItam, toMW, toLab]);

  return (
    <div className="map-container">
      {theme === ETheme.DARK ? (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "" }}
          center={coordinate}
          onGoogleApiLoaded={renderMarker}
          options={googleMapDarkThemeConfig}
          yesIWantToUseGoogleMapApiInternals
          zoom={zoom}
        />
      ) : (
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_API_KEY ?? "" }}
          center={coordinate}
          onGoogleApiLoaded={renderMarker}
          options={googleMapLightThemeConfig}
          yesIWantToUseGoogleMapApiInternals
          zoom={zoom}
        />
      )}
    </div>
  );
};

export default GoogleMapContainer;
