import { Suspense, useEffect, useRef } from "react"
import styled from "styled-components"
import { Canvas } from "@react-three/fiber"
import { a, useTransition } from "@react-spring/web"
import * as THREE from "three"

import GetWorldInfo from "@components/GetWorldInfo/GetWorldInfo"
import HUD from "./components/HUD"

import { useStore } from "@state/store"
import centerXRScene from "@utils/centerXRScene"
import Labels from "./components/Labels"

function ARScene() {
  const AROpen = useStore((s) => s.AROpen)
  const worldInfo = useStore((s) => s.worldInfo)
  const renderer = useRef<any>(null)
  const XRSession = useRef<XRSession | null>(null)
  const XRAPI = navigator.xr
  const setSessionStarted = useStore((s) => s.setSessionStarted)
  const sessionStarted = useStore((s) => s.sessionStarted)
  const setCentered = useStore((s) => s.setCentered)
  const centered = useStore((s) => s.centered)
  const setARLabels = useStore(s => s.setARLabels)

  function handleSessionRequest() {
    const sessionInit = {
      optionalFeatures: [
        "local-floor",
        "bounded-floor",
        "dom-overlay",
      ],
      domOverlay: {
        root: document.getElementById("ar-overlay"),
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

  function center() {
    if (XRSession.current) {
      centerXRScene(XRSession.current, renderer.current, worldInfo.camera)
      setCentered(!centered)
    }
  }

  function handleClose() {
    XRSession.current = null
    setCentered(false)
    setSessionStarted(false)
    setARLabels(["sites"])
  }

  const transition = useTransition(AROpen, {
    from: {
      transform: "translate(50%, -50%)",
    },
    enter: {
      transform: "translate(-50%, -50%)",
    },
    leave: {
      transform: "translate(50%, -50%)",
    },
  })

  useEffect(() => {
    if (worldInfo) {
      renderer.current = worldInfo.gl
    }
  }, [worldInfo])

  return transition(
    (anm, loaded) =>
      loaded && (
        <ARSceneWrapper style={anm}>
          <Suspense fallback={null}>
            <Canvas camera={{ position: new THREE.Vector3(0, 0, 0) }}>
              <GetWorldInfo />
              <Labels />
            </Canvas>
          </Suspense>
          <HUD
            handleSession={handleSessionRequest}
            handleCenter={center}
            handleClose={handleClose}
          />
        </ARSceneWrapper>
      )
  )
}

export default ARScene

const ARSceneWrapper = styled(a.div)`
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
`
