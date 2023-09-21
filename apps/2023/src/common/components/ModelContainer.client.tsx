"use client";

import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, type Vector3 } from "@react-three/fiber";
import { type PropsWithChildren, Suspense } from "react";

import Loader from "@common/components/Loader";

interface IProps {
  cameraNear?: number;
  cameraPosition?: Vector3;
}

const ModelContainer = ({ children, cameraNear, cameraPosition }: PropsWithChildren<IProps>) => {
  return (
    <>
      <div className="model-container--bg" />
      <div className="model-container">
        <Suspense fallback={<Loader />}>
          <Canvas className="canvas-wrapper">
            <PerspectiveCamera
              far={1000}
              fov={30} // 시야각 조정
              makeDefault
              near={cameraNear}
              position={cameraPosition} // 카메라의 초기 위치를 조정
            />
            {children}
            <OrbitControls
              enablePan={false}
              enableRotate={false}
              // minPolarAngle={Math.PI / 2} // 최소 x,y 축
              // maxPolarAngle={Math.PI / 2} // 최대 x,y 축
              enableZoom={false}
            />
            <Environment preset="forest" />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
};

export default ModelContainer;
