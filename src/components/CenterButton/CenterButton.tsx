import styled from "styled-components"
import { a, useTransition } from "@react-spring/web"
import globalStyles from "@data/globalStyles"

function CenterButton({ cue, ...props }) {
  const transition = useTransition(cue, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  return transition(
    (anm, loaded) =>
      loaded && (
        <ButtonWrapper style={anm} {...props}>
          <p>RE-CENTRE</p>
        </ButtonWrapper>
      )
  )
}

export default CenterButton

const ButtonWrapper = styled(a.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  z-index: 2;
  background-color: ${globalStyles.colors.dark.main}CC;
  display: grid;
  place-content: center;

  & P {
    width: 8rem;
    height: 3rem;
    background-color: ${globalStyles.colors.dark.accent}66;
    padding: 5%;
    border-radius: 5rem;
    font-size: 1rem;
    text-align: center;
    display: grid;
    place-content: center;
  }
`
