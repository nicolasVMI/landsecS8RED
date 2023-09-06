import { useRef, useEffect } from 'react'
import styled from 'styled-components'

import { useStore } from "@state/store";

function XRButton() {
  const worldInfo = useStore(s => s.worldInfo)
  const socket = useStore(s => s.socket)
  const buttonRef = useRef()
  const XRSession = useRef<XRSession | null>(null)
  const renderer = useRef<any>(null)
  //@ts-ignore
  const XRAPI = navigator.xr

  function handleSessionRequest() {
     const sessionInit = {
        optionalFeatures: [
           "local-floor",
           "bounded-floor",
           "hand-tracking",
           "layers"
        ]
     }
     XRAPI.requestSession("immersive-vr", sessionInit).then(session => {
        XRSession.current = session
        // XRSession.current.onselectstart = logEvent
      //   XRSession.current.onselect = 
        // XRSession.current.onselectend = logEvent
        XRSession.current.onend = () => {       }
        renderer.current.xr.setSession(XRSession.current)
        //  console.log(renderer.xr)
        //  console.log(XRSession.current)
     })
  }

  useEffect(() => {
    if(worldInfo){
      renderer.current = worldInfo.gl
    }
  }, [worldInfo])

  return (
     <Button onClick={handleSessionRequest} ref={buttonRef}>
        {XRAPI ? "ENTER" : "XR NOT AVAILABLE"}
     </Button>
  )
  
}

export default XRButton

const Button = styled.button`
position: absolute;
z-index: 1;
bottom: 3%;
left: 50%;
transform: translateX(-50%);
border: 2px solid green;
background-color: lightgreen;
color: darkgreen;
width: 150px;
height: 50px;
`