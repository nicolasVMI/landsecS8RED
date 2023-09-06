import { Suspense, useEffect, useRef } from "react"
import styled from "styled-components"
import { Canvas } from "@react-three/fiber"
import * as THREE from "three"

import GetWorldInfo from "@components/GetWorldInfo/GetWorldInfo"

import { useStore } from "@state/store"
import Picker360 from "@components/Picker360/Picker360"

function XRTabletController() {
  const worldInfo = useStore((s) => s.worldInfo)
  const currentTour = useStore((s) => s.currentTour)
  const setCurrentTour = useStore((s) => s.setCurrentTour)
  const socket = useStore((s) => s.socket)
  const renderer = useRef<any>(null)

  const array = [
    "/textures/landsec/mini/bridge_plaza.webp",
    "/textures/landsec/mini/bridge.webp",
    "/textures/landsec/mini/liberty.webp",
    "/textures/landsec/mini/lion_court.webp",
    "/textures/landsec/mini/lion_river.webp",
    "/textures/landsec/mini/lion_terrace.webp",
    "/textures/landsec/mini/timber_int.webp",
    "/textures/landsec/mini/timber.webp",
  ]

  const imgs = {
    bridge: [
      {
        src: "/textures/landsec/mini/bridge_plaza.webp",
        index: 0,
      },
      {
        src: "/textures/landsec/mini/bridge.webp",
        index: 1,
      },
    ],
    liberty: [
      {
        src: "/textures/landsec/mini/liberty.webp",
        index: 2,
      },
    ],
    lion: [
      {
        src: "/textures/landsec/mini/lion_court.webp",
        index: 3,
      },
      {
        src: "/textures/landsec/mini/lion_river.webp",
        index: 4,
      },
      {
        src: "/textures/landsec/mini/lion_terrace.webp",
        index: 5,
      },
    ],
    timber: [
      {
        src: "/textures/landsec/mini/timber_int.webp",
        index: 6,
      },
      {
        src: "/textures/landsec/mini/timber.webp",
        index: 7,
      },
    ],
  }

  const description = [
    "FRONT",
    "BACK",
    "FRONT",
    "GROUND",
    "ACROSS THAMES",
    "AERIAL",
    "RECEPTION",
    "FRONT",
  ]

  useEffect(() => {
    if (worldInfo) {
      renderer.current = worldInfo.gl
    }
  }, [worldInfo])
  return (
    <TabletWrapper>
      <Suspense fallback={null}>
        <Canvas camera={{ position: new THREE.Vector3(0, 0, 0) }}>
          <GetWorldInfo />
        </Canvas>
      </Suspense>
      <Controls>
        <Picker360
          activeIndexes={[0, 1]}
          arr={imgs.bridge}
          title={["SOUTHWARK BRIDGE"]}
          subtitle={description[currentTour]}
        />
        <Picker360
          activeIndexes={[2]}
          arr={imgs.liberty}
          title={["LIBERTY OF SOUTHWARK"]}
          subtitle={description[currentTour]}
        />
        <Picker360
          activeIndexes={[3, 4, 5]}
          arr={imgs.lion}
          title={["RED LION COURT"]}
          subtitle={description[currentTour]}
        />
        <Picker360
          activeIndexes={[6, 7]}
          arr={imgs.timber}
          title={["TIMBER SQUARE"]}
          subtitle={description[currentTour]}
        />
      </Controls>
    </TabletWrapper>
  )
}
export default XRTabletController

const TabletWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Controls = styled.div`
  position: absolute;
  width: 80%;
  height: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: nowrap;
`
