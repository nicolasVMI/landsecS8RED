import { Fragment, useRef, useState, useEffect } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import CameraControls from "./components/CameraControls";
import Sphere from "./components/Sphere";
import { useStore } from "@state/store";
import GetWorldInfo from "@components/GetWorldInfo/GetWorldInfo";

function Transition360() {
  const [animationOver, setAnimationOver] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeFinish, setActiveFinish] = useState(0);
  const currentTour = useStore((s) => s.currentTour);

  const shaderRef = useRef();

  const loaded = [
   "/textures/bogota.jpg",
   "/textures/hoboken/hudson.jpg",
   "/textures/hoboken/plaza.jpg",
   "/textures/hoboken/terrace.jpg",
   "/textures/lesbordes/living.jpg",
   "/textures/lesbordes/bedroom.jpg",
   "/textures/lesbordes/master.jpg",
 ].map((path) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLoader(THREE.TextureLoader, path)
  );

  loaded.forEach((texture) => {
    texture.minFilter = THREE.LinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = 1;
    //@ts-ignore
    texture.flipX = true;
  });

  // console.log(loaded)

  const start = useRef(0);
  const blend = useRef(0);
  const currentInitialTexture = useRef();
  const duration = 1000;

  function map_range(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  }

  function getBlendValue(time, texture) {
    if (start.current === 0) {
      // console.log("start", blend.current, texture)
      start.current = time;
      setIsAnimating(true);
    }
    const elapsed = time - start.current;
    blend.current = Math.min(map_range(elapsed, 0, duration, 0.0, 1.0), 1.0);

    if (blend.current < 1) {
      // console.log("running", blend.current)
      //@ts-ignore
      shaderRef.current.uniforms.uBlend.value = blend.current;
      //@ts-ignore
      requestAnimationFrame((time, texture) => {
        getBlendValue(time, texture);
      });
    } else {
      // console.log("finish", blend.current)
      start.current = 0;
      blend.current = 0;
      //@ts-ignore
      shaderRef.current.uniforms.uInitialTexture.value =
        currentInitialTexture.current;
      setIsAnimating(false);
      return;
    }
  }

  function handleTextureChange(texture) {
    //@ts-ignore
    shaderRef.current.uniforms.uFinalTexture.value = texture;
    currentInitialTexture.current = texture;
    getBlendValue(0, texture);
  }

  const change = useRef([loaded[activeFinish], loaded[currentTour]])

  useEffect(() => {
    shaderRef.current && handleTextureChange(loaded[currentTour]);
   //  setTimeout(() => {
   //    setActiveFinish(currentTour);
   //  }, duration);
  }, [currentTour]);

  return (
    <Fragment>
      <Canvas>
        <CameraControls />
        <Sphere
          position={new THREE.Vector3(0)}
          shaderRef={shaderRef}
          initialTexture={change.current[0]}
          finalTexture={change.current[1]}
          blend={0}
        />
        <GetWorldInfo />
      </Canvas>
    </Fragment>
  );
}

export default Transition360;
