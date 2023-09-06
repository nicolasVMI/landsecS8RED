import styled from "styled-components"
import { Fragment, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { XR, Hands } from "@react-three/xr"

import { useStore } from "@state/store"
import globalStyles from "@data/globalStyles"
import centerXRScene from "@utils/centerXRScene"

import config from "../../config"

function WebXRScene({ children }) {
  const socket = useStore((s) => s.socket)
  const worldInfo = useStore((s) => s.worldInfo)
  const XRSession = useRef<XRSession | null>(null)
  const renderer = useRef<any>(null)
  const camera = useRef<any>(null)
  //@ts-ignore
  const XRAPI = navigator.xr

  function handleSessionRequest() {
    const sessionInit = {
      optionalFeatures: config.tablet
        ? ["local-floor"]
        : ["local-floor", "hand-tracking"],
    }
    XRAPI.requestSession(
      config.tablet ? "immersive-ar" : "immersive-vr",
      sessionInit
    ).then((session) => {
      XRSession.current = session
      XRSession.current.onselect = () => null
      XRSession.current.onend = () => {
        XRSession.current = null
        if(socket){
          socket.emit("test", {
            type: "update",
            value: {
              type: "session",
              user: config.user,
              value: false,
            },
          })
        }
      }
      renderer.current.xr.setSession(XRSession.current)
    }).then(() => {
        if(socket){
          socket.emit("test", {
            type: "update",
            value: {
              type: "session",
              user: config.user,
              value: true,
            },
          })
        }
    })
  }

  function center() {
    if (XRSession.current) {
      centerXRScene(XRSession.current, renderer.current, camera.current)
    }
  }

  useEffect(() => {
    if (worldInfo) {
      renderer.current = worldInfo.gl
      camera.current = worldInfo.camera
    }
  }, [worldInfo])

  useEffect(() => {
    socket &&
      socket.on("receive-test", (data) => {
        if (data.type === "center") {
          center()
          return
        }
      })
  }, [socket])
  return (
    <Fragment>
      <Canvas onClick={handleSessionRequest}>
        <XR>
          <Hands />
          {children}
        </XR>
        {/* <Label /> */}
      </Canvas>
    </Fragment>
  )
}

export default WebXRScene

const TourName = styled.div`
  position: absolute;
  bottom: 5%;
  right: 5%;
  background-color: ${globalStyles.colors.dark.main};
  width: 30%;
  height: 20%;
  border-left: 2px solid ${globalStyles.colors.dark.accent};
  display: grid;
  place-content: center;
  font-size: 2rem;
  opacity: 0.8;
  text-align: center;
  color: ${globalStyles.colors.dark.accent};

  & span {
    font-size: 1rem;
  }
`

// function Label() {
//   const worldInfo = useStore((s) => s.worldInfo)
//   const currentTour = useStore((s) => s.currentTour)
//   const labelRef = useRef<any>()

//   const names = [
//     "SOUTHWARK BRIDGE",
//     "SOUTHWARK BRIDGE",
//     "LIBERTY OF SOUTHWARK",
//     "RED LION COURT",
//     "RED LION COURT",
//     "RED LION COURT",
//     "TIMBER SQUARE",
//     "TIMBER SQUARE",
//   ]

//   const description = [
//     "FRONT",
//     "BACK",
//     "FRONT",
//     "GROUND",
//     "ACROSS THAMES",
//     "AERIAL",
//     "RECEPTION",
//     "FRONT",
//   ]

//   useEffect(() => {
//     if (labelRef.current && worldInfo) {
//       const camera = worldInfo.camera
//       const scene = worldInfo.scene

//       camera.add(labelRef.current)
//       scene.add(camera)
//     }
//   }, [worldInfo])

//   return (
//     <Html ref={labelRef} position={[10, -6, -5]} as="div" material={<meshBasicMaterial color={"red"}/>}>
//       <TourName id="label">
//         {names[currentTour]}
//         <br />
//         <span>{description[currentTour]}</span>
//       </TourName>
//     </Html>
//     // <mesh position={[0, 0,-5]} ref={labelRef}>
//     //     <planeBufferGeometry args={[0.5, 20]} />
//     //     <meshBasicMaterial color={"red"}/>
//     //   </mesh>
//   )
// }
