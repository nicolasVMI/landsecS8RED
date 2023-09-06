import styled from "styled-components"
import { useTransition, a } from "@react-spring/web"

import { useStore } from "@state/store"

function HeadsetModal() {
  const modalOpen = useStore(s => s.modalOpen)

  const transition = useTransition(modalOpen, {
    from:{opacity: 0},
    enter:{opacity: 1},
    leave:{opacity: 0},
  })

  return transition(
    (anm, loaded) =>
      loaded && (
        <ModalWrapper style={anm}>

        </ModalWrapper>
      )
  )
}

export default HeadsetModal

const ModalWrapper  = styled(a.div)`
  position: fixed;
  z-index: 10;
  top: 50%;
  left: calc(50% + 10vh);
  transform: translate(-50%, -50%);
  width: 30%;
  height: 50%;
  border: 2px solid red;
`