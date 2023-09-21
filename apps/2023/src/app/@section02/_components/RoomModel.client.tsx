"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { LoopOnce } from "three";

import useAnimateWrapper from "@common/hooks/useAnimateWrapper";
import useMediaQuery from "@common/hooks/useMediaQuery";
import { sleep } from "@common/utils/timer";

const RESOURCE_PATH = "/model/portfolio_room.glb";

useGLTF.preload(RESOURCE_PATH);

interface IProps {
  isInit: boolean;
  isFlight: boolean;
  distance: number;
  onArrived: () => void;
}

/**
 * @constant camera_position [10, 6, 10]
 * @constant camera_near 0.1
 */
const RoomModel = ({ isInit, isFlight, distance, onArrived }: IProps) => {
  const { scene, animations } = useGLTF(RESOURCE_PATH);
  const { actions } = useAnimateWrapper(animations, scene);
  const { isMobile } = useMediaQuery();

  // room 모델 착륙
  const landAnimate = () => {
    const flyingClips = Object.entries(actions).filter(([key]) => key.includes("flying"));
    const landClips = Object.entries(actions).filter(([key]) => key.includes("land"));

    flyingClips?.forEach(([_, clip]) => {
      clip?.stop();
    });

    landClips.forEach(([_, clip], idx) => {
      clip
        ?.setLoop(LoopOnce, 1)
        .setDuration(4)
        .play()
        .onFinish((_this) => {
          _this.stop();
          if (idx === 0) onArrived();
        });
    });
  };

  // room 모델 이륙 - 활공 유지
  const takeoffAnimate = () => {
    const takeoffClips = Object.entries(actions).filter(([key]) => key.includes("takeoff"));
    const flyingClips = Object.entries(actions).filter(([key]) => key.includes("flying"));

    takeoffClips.forEach(([key, clip]) => {
      const flyingClip = flyingClips.find(
        ([key2]) => key.split("_")[0] === key2.split("_")[0]
      )?.[1];
      clip
        ?.setLoop(LoopOnce, 1)
        .play()
        .onFinish((_this) => {
          _this.stop();
          flyingClip?.play();
        });
    });
  };

  const armatureInitAnimate = () => {
    setTimeout(() => {
      actions.armature_falling
        ?.setLoop(LoopOnce, 1)
        .play()
        .onFinish((_this) => {
          _this.stop();
          actions.armature_typing?.setDuration(1.5).play();
        });
    }, 0);
  };

  const onFlight = async () => {
    let delay = Math.max(Math.floor(distance / 0.0039), 2000);
    if (isMobile) delay += delay > 2000 ? 2100 : 500;

    takeoffAnimate();
    await sleep(delay);
    landAnimate();
  };

  useEffect(() => {
    if (isInit) armatureInitAnimate();
  }, [isInit]);

  useEffect(() => {
    if (isFlight) void onFlight();
  }, [isFlight]);

  return <primitive object={scene} scale={isMobile ? 0.7 : 0.8} />;
};

export default RoomModel;
