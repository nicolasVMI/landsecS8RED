import { useState, Suspense, useEffect, useRef } from "react"
import styled from "styled-components"
import { Canvas } from "@react-three/fiber"
import { a, useTransition } from "@react-spring/web"

import GetWorldInfo from "@components/GetWorldInfo/GetWorldInfo"
import HUD from "./components/HUD"
import Loading from "@components/Loading/Loading"

import { useStore } from "@state/store"
import globalStyles from "@data/globalStyles"
import SphericalTour from "@components/SphericalTour/SphericalTour"

import centerXRScene from "@utils/centerXRScene"

function ARTour() {
  const [visible, setVisible] = useState(false)
  const ARTourOpen = useStore((s) => s.ARTourOpen)
  const worldInfo = useStore((s) => s.worldInfo)
  const renderer = useRef<any>(null)
  const XRSession = useRef<XRSession | null>(null)
  const XRAPI = navigator.xr
  const setSessionStarted = useStore((s) => s.setSessionStarted)
  const sessionStarted = useStore((s) => s.sessionStarted)
  const currentTour = useStore((s) => s.currentTour)

  function handleSessionRequest() {
    const sessionInit = {
      optionalFeatures: ["local-floor", "dom-overlay"],
      domOverlay: {
        root: document.getElementById("tour-overlay"),
      },
    }

    if (sessionStarted) {
      XRSession.current.end()
      setSessionStarted(false)
      return
    }
    XRAPI.requestSession("immersive-ar", sessionInit).then((session) => {
      XRSession.current = session
      XRSession.current.onend = handleClose
      renderer.current.xr.setSession(XRSession.current)
      setSessionStarted(true)
    })
  }

  function handleClose() {
    XRSession.current = null
    setSessionStarted(false)
  }

  const transition = useTransition(ARTourOpen, {
    from: {
      transform: "translate(50%, -50%)",
    },
    enter: {
      transform: "translate(-50%, -50%)",
    },
    leave: {
      transform: "translate(50%, -50%)",
    },
    onRest: () => {
      setTimeout(() => setVisible(ARTourOpen), 800)
    },
  })

  function center() {
    if (XRSession.current) {
      centerXRScene(XRSession.current, renderer.current, worldInfo.camera)
    }
  }

  const textures = [
    {
      texture: "/textures/landsec/bridge_plaza.webp",
      rotation: [0, -3.5, 0],
    },
    {
      texture: "/textures/landsec/bridge.webp",
      rotation: [0, 3.2, 0],
    },
    {
      texture: "/textures/landsec/liberty.webp",
      rotation: [0, 1.25, 0],
    },
    {
      texture: "/textures/landsec/lion_court.webp",
      rotation: [0, 1.53, 0],
    },
    {
      texture: "/textures/landsec/lion_river.webp",
      rotation: [0, 0, 0],
    },
    {
      texture: "/textures/landsec/lion_terrace.webp",
      rotation: [0, 3.5, 0],
    },
    {
      texture: "/textures/landsec/timber_int.webp",
      rotation: [0, -0.3, 0],
    },
    {
      texture: "/textures/landsec/timber.webp",
      rotation: [0, 0.9, 0],
    },
  ]

  const tourIndex = useRef(0)

  useEffect(() => {
    if (worldInfo) {
      renderer.current = worldInfo.gl
    }
  }, [worldInfo])

  useEffect(() => {
    tourIndex.current = currentTour
  }, [currentTour])

  return transition(
    (anm, loaded) =>
      loaded && (
        <ARTourWrapper style={anm}>
          {!visible && <Loading />}
          <Suspense fallback={null}>
            <Canvas
              camera={{
                fov: 70,
              }}
            >
              {visible && (
                <>
                  <GetWorldInfo />
                  <SphericalTour
                    texture={textures[tourIndex.current].texture}
                    initialRotation={textures[tourIndex.current].rotation}
                  />
                </>
              )}
            </Canvas>
          </Suspense>
          <HUD handleSession={handleSessionRequest} handleCenter={center} />
        </ARTourWrapper>
      )
  )
}

export default ARTour

const ARTourWrapper = styled(a.div)`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  background-color: ${globalStyles.colors.dark.main};
`
