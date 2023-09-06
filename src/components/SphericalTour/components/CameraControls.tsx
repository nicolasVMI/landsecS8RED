import { extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React from "react";

extend({OrbitControls})

function CameraControls() {

   const {camera, gl:{domElement}} = useThree()
  return (
   <React.Fragment>
      <OrbitControls
         args={[camera, domElement]}
         enableZoom={false}
         autoRotate={false}
         rotateSpeed={-0.30}
      />
   </React.Fragment>
  )
}

export default CameraControls

