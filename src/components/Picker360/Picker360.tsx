import styled from "styled-components"

import { useStore } from "@state/store"
import globalStyles from "@data/globalStyles"
import CenterButton from "@components/CenterButton/CenterButton"

function Picker360({ arr, title, subtitle, activeIndexes }) {
  const currentTour = useStore((s) => s.currentTour)
  const setCurrentTour = useStore((s) => s.setCurrentTour)
  const socket = useStore((s) => s.socket)

  return (
    <PickerWrapper>
      <Title>
        {title[0]}
        <br />
        <span style={{ opacity: activeIndexes.includes(currentTour) ? 1 : 0 }}>
          {subtitle}
        </span>
      </Title>
      {arr.map((obj, i) => {
        return (
          <Button
            key={i}
            style={{
              borderColor:
                currentTour === obj.index
                  ? globalStyles.colors.dark.accent
                  : "transparent",
            }}
          >
            <img
              alt=""
              src={obj.src}
              onClick={() => {
                setCurrentTour(obj.index)
                socket.emit("test", {
                  type: "texture",
                  count: obj.index,
                })
              }}
            />
            <CenterButton
              cue={currentTour === obj.index}
              onClick={() => {
                socket.emit("test", {
                  type: "center",
                })
                socket.emit("test", {
                  type: "texture",
                  count: obj.index,
                })
              }}
            />
            <h1>0{obj.index + 1}</h1>
          </Button>
        )
      })}
    </PickerWrapper>
  )
}

export default Picker360

const PickerWrapper = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const Button = styled.div`
  position: relative;
  height: 80%;
  width: 25%;
  font-size: 30px;
  overflow: hidden;
  cursor: pointer;
  pointer-events: all;
  border-width: 3px;
  border-style: solid;
  transition: border-color 0.8s ease-in-out;

  & img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & h1{
    position: absolute;
    right: 2%;
    bottom: 2%;
    opacity: 0.8;
    font-size: 3rem;
    z-index: 2;
  }
`

const Title = styled.div`
  position: relative;
  height: 80%;
  width: 20%;
  margin-right: 3%;
  border-right: 2px solid ${globalStyles.colors.dark.accent};
  display: grid;
  place-content: center;
  font-size: 1.3rem;
  opacity: 0.8;
  text-align: center;
  color: ${globalStyles.colors.dark.accent};

  & span {
    font-size: 1rem;
  }
`
