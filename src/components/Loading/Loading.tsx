import { useEffect, useRef, useState } from "react"
import styled from "styled-components"

import globalStyles from "@data/globalStyles"

function Loading() {
  // const [readyToAnimate, setReadyToAnimate] = useState(false)
  const dots = [".", ".", "."]
  const lineLength = useRef<number | null>(null)
  const polygonRef = useRef<SVGPolygonElement>()
  // const keyframes = [
  //   {
  //     strokeDashoffset: 0,
  //   },
  //   {
  //     strokeDashoffset: lineLength.current,
  //   }
  // ]
  // const config = {
  //   duration: 3000,
  //   iterations: Infinity,
  //   easing: "cubic-bezier(.89,-0.62,.26,1.54)",
  //   direction: "alternate",
  // }

  // useEffect(() => {
  //   if (readyToAnimate) {
  //     polygonRef.current.animate(
  //       [
  //         {
  //           strokeDashoffset: 0,
  //         },
  //         {
  //           strokeDashoffset: lineLength.current,
  //         }
  //       ],
  //       {
  //         duration: 5000,
  //         iterations: Infinity,
  //         easing: "cubic-bezier(.82,-0.38,.2,1.38)",
  //         direction: "alternate",
  //       }
  //     )
  //   }
  // }, [readyToAnimate])

  return (
    <LoadingWrapper>
      <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 128 128"
      >
        <polygon
          points="81.59 81.59 46.41 81.59 46.41 46.41 46.41 46.41 11.05 11.05 11.05 116.95 116.95 116.95 81.59 81.59"
          fill={globalStyles.colors.dark.accent}
          stroke={globalStyles.colors.dark.accent}
          // strokeDasharray={lineLength.current}
          strokeWidth={5}
          ref={(node) => {
            if (node) {
              lineLength.current = node.getTotalLength()
              polygonRef.current = node
              // setTimeout(() => {
              //   setReadyToAnimate(true)
              // }, 1000)
            }
          }}
        />
      </svg>
      <h1>
        LOADING
        {dots.map((dot, i) => {
          return (
            <div
              key={`dot${i}`}
              className={`anm`}
              style={{ animationDelay: `${0.75 + 0.25 * i}s` }}
            >
              {dot}
            </div>
          )
        })}
      </h1>
    </LoadingWrapper>
  )
}

export default Loading

const LoadingWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  gap: 1rem;
  pointer-events: none;

  @-webkit-keyframes jump {
    0% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    25% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    50% {
      -webkit-transform: translate(0, -25%);
      transform: translate(0, -25%);
    }
  }

  @keyframes jump {
    0% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    25% {
      -webkit-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    50% {
      -webkit-transform: translate(0, -25%);
      transform: translate(0, -25%);
    }
  }

  .anm {
    -webkit-animation: jump 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite
      both;
    animation: jump 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite both;
    animation-delay: 0.5s;
  }

  & h1 {
    font-size: 2rem;
    text-align: center;
    display: flex;
    gap: 0.3rem;
  }
`
