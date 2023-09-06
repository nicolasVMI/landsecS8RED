import { useRef, useEffect } from "react"
import styled from "styled-components"
import { useStore } from "@state/store"
import globalStyles from "@data/globalStyles"

function HUD({ handleSession, handleCenter, handleClose }) {
  const sessionStarted = useStore((s) => s.sessionStarted)
  const AROpen = useStore((s) => s.AROpen)
  const centered = useStore((s) => s.centered)
  const ARLabels = useStore((s) => s.ARLabels)
  const toggleARLabels = useStore((s) => s.toggleARLabels)

  const videoRef = useRef<HTMLVideoElement>()
  const streamRef = useRef<MediaStream | null>(null)

  const facingMode = "environment"
  const constraints = {
    audio: false,
    video: {
      facingMode: facingMode,
    },
  }

  useEffect(() => {
    return () => {
      //@ts-ignore
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (sessionStarted && streamRef.current !== null) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      videoRef.current.srcObject = null
    } else if (AROpen) {
      const stream = async () =>
        await navigator.mediaDevices
          .getUserMedia(constraints)
          .then((tracks) => {
            videoRef.current.srcObject = tracks
            streamRef.current = tracks
          })
      stream()
    }
  }, [sessionStarted])

  return (
    <HUDInterface id="ar-overlay">
      <Video muted playsInline autoPlay ref={videoRef} />
      <CenterLine
        style={{
          opacity: centered ? 0 : 1,
        }}
      />
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
        onClick={handleCenter}
        style={{
          opacity: sessionStarted ? 1 : 0,
        }}
      >
        {centered ? "RE-CENTER" : "CENTER"}
      </button>
      <Labels>
        <div
          style={{ opacity: ARLabels.includes("transport") ? 1 : 0.5 }}
          onClick={() => {
            toggleARLabels("transport")
          }}
        >
          TRANSPORT
        </div>
        <div
          style={{ opacity: ARLabels.includes("culture") ? 1 : 0.5 }}
          onClick={() => {
            toggleARLabels("culture")
          }}
        >
          CULTURE
        </div>
        <div
          style={{ opacity: ARLabels.includes("other") ? 1 : 0.5 }}
          onClick={() => {
            toggleARLabels("other")
          }}
        >
          OTHER
        </div>
      </Labels>
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
  background-color: ${globalStyles.colors.dark.main};

  & button {
    position: absolute;
    bottom: 5%;
    right: 5%;
    border: 2px solid;
    width: 10%;
    height: 7%;
    transition: opacity ease-in-out 0.8s;

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

const CenterLine = styled.div`
  position: absolute;
  width: 2px;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: red;
  transition: opacity ease-in-out 0.8s;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: transparent;
`

const Labels = styled.div`
  width: 30%;
  height: 7%;
  position: absolute;
  bottom: 5%;
  left: 5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & div {
    background-color: ${globalStyles.colors.dark.accent};
    width: 30%;
    height: 100%;
    display: grid;
    place-content: center;
    transition: opacity 0.8s ease-in-out;
  }
`
