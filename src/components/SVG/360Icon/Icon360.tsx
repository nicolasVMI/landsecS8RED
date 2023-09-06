import { useSpring, a } from "@react-spring/web"

function Icon360({ cue, strokeColor, strokeWidth }) {
  const lineSpring = useSpring({
    start: cue ? "130" : "20",
    end: cue ? "20" : "130"
  })
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="100%"
      height="100%"
      viewBox="0 0 150 150"
      xmlSpace="preserve"
    >
      <g>
        <circle
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeMiterlimit="10"
          cx="75"
          cy="75"
          r="68.4"
        />
        <ellipse
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeMiterlimit="10"
          cx="75"
          cy="75.1"
          rx="67.1"
          ry="39.3"
        />
        <ellipse
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeMiterlimit="10"
          cx="75"
          cy="75.1"
          rx="39.3"
          ry="67.1"
        />
        <a.line
          x1="20"
          y1="20"
          x2={lineSpring.end}
          y2={lineSpring.end}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <a.line
          x1="130"
          y1="20"
          x2={lineSpring.start}
          y2={lineSpring.end}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>
  )
}

export default Icon360
