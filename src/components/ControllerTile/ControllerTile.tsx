import { useState } from "react"
import styled from "styled-components"

import VRIcon from "@components/SVG/VRIcon/VRIcon"

import globalStyles from "@data/globalStyles"

function ControllerTile({ data }) {
  return (
    <TileWrapper
      style={{
        opacity: data.online ? 1 : 0.3,
      }}
    >
      <ImageGroup>
        <Background
          style={{ backgroundColor: globalStyles.colors.headsets[data.color] }}
        />
        <Image width="100%" height="100%" viewBox="0 0 500 500">
          <defs>
            <mask id="mask">
              <path
                fill="white"
                d="M500,50v400H250c-109.5,0-198.4-88-200-197.1c0-0.9,0-1.7,0-2.6c0-1.8,0-3.7,0.1-5.5
	C52.8,136.8,141.3,50,250,50H500z"
              />
            </mask>
          </defs>

          <image
            xlinkHref={
              data.tablet ? "/images/tablet.webp" : "/images/headset.webp"
            }
            width="550"
            height="550"
            x={-25}
            y={-15}
            mask="url(#mask)"
          />
        </Image>
      </ImageGroup>
      <NetworkMarker
        style={{
          backgroundColor: data.online ? "lightgreen" : "salmon",
        }}
      />
      <CurrentTour>
        <span
          style={{
            opacity: data.online ? 0 : 1,
          }}
        >
          --
        </span>
        <span
          style={{
            opacity: data.online ? 1 : 0,
          }}
        >
          0{data.currentTour + 1}
        </span>
      </CurrentTour>
      <SessionState>
        <VRIcon
          cue={data.inSession}
          strokeWidth={1}
          strokeColor={globalStyles.colors.dark.secondary}
        />
      </SessionState>
    </TileWrapper>
  )
}

export default ControllerTile

const TileWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 80%;
  transition: opacity 0.8s ease-in-out;
`

const ImageGroup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  aspect-ratio: 1/1;
`

const Background = styled.div`
  position: absolute;
  width: 70%;
  height: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 100%;
`

const Image = styled.svg`
  position: absolute;
  width: 85%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  aspect-ratio: 1/1;
  object-fit: cover;
`

const NetworkMarker = styled.div`
  position: absolute;
  top: 5%;
  right: 0%;
  width: 1rem;
  aspect-ratio: 1/1;
  transition: background-color 0.8s ease-in-out;
  border-radius: 100%;
`

const SessionState = styled.div`
  position: absolute;
  bottom: 2%;
  right: -2%;
  width: 2rem;
  aspect-ratio: 1/1;
  transition: background-color 0.8s ease-in-out;
  border-radius: 100%;
`

const CurrentTour = styled.h1`
  position: absolute;
  width: 50%;
  bottom: 2%;
  left: 2%;
  text-align: left;
  font-weight: 100;
  font-size: 1.5rem;
  color: ${globalStyles.colors.dark.secondary};

  & span {
    position: absolute;
    transform: translate(0%, -100%);
    transition: opacity 0.8s ease-in-out;
  }
`
