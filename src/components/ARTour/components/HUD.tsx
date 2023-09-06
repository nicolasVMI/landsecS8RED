import { useState } from "react"
import styled from "styled-components"
import { useStore } from "@state/store"

function HUD({ handleSession, handleCenter }) {
  const sessionStarted = useStore((s) => s.sessionStarted)

  return (
    <HUDInterface id="tour-overlay">
      <button
        onClick={handleSession}
        style={{
          opacity: sessionStarted ? 0 : 1,
          pointerEvents: sessionStarted ? "none" : "all",
        }}
      >
        ENTER AR
      </button>
      <button
        onClick={handleSession}
        style={{
          opacity: sessionStarted ? 1 : 0,
          pointerEvents: sessionStarted ? "all" : "none",
        }}
      >
        EXIT AR
      </button>
      <button
        onClick={() => {
            handleCenter()
        }}
        style={{
          opacity: sessionStarted ? 1 : 0,
        }}
      > 
      CENTER
      </button>
    </HUDInterface>
  )
}

export default HUD

const HUDInterface = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;

  & button {
    position: absolute;
    bottom: 5%;
    right: 5%;
    border: 2px solid;
    width: 10%;
    height: 7%;
    transition: opacity ease-in-out 0.8s;
    pointer-events: all;

    :nth-of-type(1) {
      border-color: green;
      background-color: lightgreen;
      color: darkgreen;
    }

    :nth-of-type(2) {
      border-color: red;
      background-color: salmon;
      color: red;
    }

    :nth-of-type(3) {
      bottom: 15%;
      color: black;
    }
  }
`
