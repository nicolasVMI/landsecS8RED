import { useEffect, useRef } from "react"
import styled from "styled-components"

import WebXRScene from "@components/WebXRScene/WebXRScene"
import GetWorldInfo from "@components/GetWorldInfo/GetWorldInfo"
import SphereManager from "@components/SphereManager/SphereManager"

import { useStore } from "@state/store"
import config from "../config"

function OculusLayout() {
  const intervalRef = useRef<null | number>(null)
  const socket = useStore((s) => s.socket)
  useEffect(() => {
    socket &&
      socket.emit("test", {
        type: "update",
        value: {
          type: "online",
          user: config.user,
          value: true
        }
      })
    if(intervalRef.current === null){
      intervalRef.current = setInterval(() => {
        socket.emit("test", {
          type: "update",
          value: {
            type: "online",
            user: config.user,
            value: true
          }
        })
      }, 2500)
    }
  }, [socket])

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])
  return (
    <Wrapper>
      <WebXRScene>
        <GetWorldInfo />
        <SphereManager />
      </WebXRScene>
    </Wrapper>
  )
}

export default OculusLayout

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`
