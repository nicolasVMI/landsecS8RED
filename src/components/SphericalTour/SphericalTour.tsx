import CameraControls from "./components/CameraControls"
import Sphere from "./components/Sphere"

function SphericalTour({ texture, initialRotation }) {
  return (
    <>
      {/* <CameraControls /> */}
      <Sphere initialRotation={initialRotation} texture={texture} />
    </>
  )
}

export default SphericalTour
