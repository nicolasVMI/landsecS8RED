import { Vector3 } from "three"
import AnimatedMaterial from "./AnimatedMaterial"

import { useStore } from "@state/store"

function Sphere({
   position,
  initialTexture,
  finalTexture,
  blend,
  shaderRef
}) {
   return (
      <mesh
         scale={[-1, 1, 1]}
         position={position}
         rotation={[0, 0, 0]}
      >
         <sphereGeometry args={[500, 60, 40]} />
         <AnimatedMaterial 
           ref={shaderRef}
           //@ts-ignore
           initialTexture={initialTexture}
           finalTexture={finalTexture}
           blend={blend}
         />
         {/* <meshBasicMaterial color="teal" side={THREE.BackSide} /> */}
      </mesh>
   )
}

export default Sphere
