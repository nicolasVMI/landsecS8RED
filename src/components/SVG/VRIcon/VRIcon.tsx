import { useSpring, a } from "@react-spring/web"

function VRIcon({ cue, strokeWidth, strokeColor, ...props }) {

  const lineSpring = useSpring({
    start: cue ? "43.9" : "6.1",
    end: cue ? "6.1" : "43.9",
  })
  return (
    <svg width="100%" height="100%" viewBox="0 0 50 50" {...props}>
      <polygon
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        points="9.1,16.3 40.9,16.3 40.9,33.7 29.3,33.7 25,29.3 20.7,33.7 9.1,33.7 "
      />
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M17.1,27.9c1.6,0,2.9-1.3,2.9-2.9s-1.3-2.9-2.9-2.9c-1.6,0-2.9,1.3-2.9,2.9S15.5,27.9,17.1,27.9z"
      />
      <path
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        d="M32.9,27.9c1.6,0,2.9-1.3,2.9-2.9s-1.3-2.9-2.9-2.9c-1.6,0-2.9,1.3-2.9,2.9S31.3,27.9,32.9,27.9z"
      />
      <a.line
        x1="6.1"
        y1="6.1"
        x2={lineSpring.end}
        y2={lineSpring.end}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <a.line
        x1="43.9"
        y1="6.1"
        x2={lineSpring.start}
        y2={lineSpring.end}
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export default VRIcon
