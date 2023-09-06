import styled from "styled-components"

import ControllerSideBar from "@components/ControllerSideBar/ControllerSideBar"
import HeadsetModal from "@components/HeadsetModal/HeadsetModal"
import ARScene from "@components/ARScene/ARScene"
import ARTour from "@components/ARTour/ARTour"
import VRIcon from "@components/SVG/VRIcon/VRIcon"
import XRTabletController from "@components/XRTabletController/XRTabletController"
import Icon360 from "@components/SVG/360Icon/Icon360"

import globalStyles from "@data/globalStyles"
import { useStore } from "@state/store"

function TabletController() {
  const AROpen = useStore((s) => s.AROpen)
  const setAROpen = useStore((s) => s.setAROpen)
  const ARTourOpen = useStore((s) => s.ARTourOpen)
  const setARTourOpen = useStore((s) => s.setARTourOpen)

  return (
    <ControllerWrapper>
      <ControllerSideBar />
      <HeadsetModal />
      <Content>
        <XRTabletController />
      </Content>
      <ARScene />
      <ARTour />
      <OpenAR
        onClick={() => {
          !ARTourOpen && setAROpen(!AROpen)
        }}
      >
        <VRIcon
          cue={!AROpen}
          strokeWidth={2}
          strokeColor={globalStyles.colors.dark.secondary}
        />
      </OpenAR>
      <OpenAR
        onClick={() => {
          !AROpen && setARTourOpen(!ARTourOpen)
        }}
        style={{ right: "6vw"}}
      >
        <Icon360
          cue={!ARTourOpen}
          strokeWidth={5}
          strokeColor={globalStyles.colors.dark.secondary}
        />
      </OpenAR>
    </ControllerWrapper>
  )
}

export default TabletController

const ControllerWrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Content = styled.div`
  position: absolute;
  right: 0;
  height: 100%;
  width: calc(100% - 20vh);
`

const OpenAR = styled.div`
  position: absolute;
  z-index: 100;
  top: 2vw;
  right: 2vw;
  width: 4rem;
  aspect-ratio: 1/1;
  background-color: ${globalStyles.colors.dark.accent};
  box-shadow: 0.5rem 0rem 1.5rem ${globalStyles.colors.dark.accent}cc;
  border-radius: 100%;
  cursor: pointer;

  & svg {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -48%);
    width: 80%;
    aspect-ratio: 1/1;
  }
`
